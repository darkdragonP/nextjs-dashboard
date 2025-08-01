import postgres from 'postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
  SgicField,
  SbordForm,
  ProductsField,
  EqEmployeesField,
} from './definitions';
import { formatCurrency } from './utils';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue[]>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw[]>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0][0].count ?? '0');
    const numberOfCustomers = Number(data[1][0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2][0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2][0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable[]>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm[]>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const customers = await sql<CustomerField[]>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchProducts() {
  try {
    const customers = await sql<ProductsField[]>`
      SELECT
        product_id,
        product_subid,
        product_name,
        product_subname
      FROM product
      ORDER BY product_id ASC, product_subid ASC
    `;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType[]>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

//sgi
export async function fetchSgciserch(
  query: string,
  currentPage: number,
) {
  try {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const sgicField = await sql<SgicField[]>`
      SELECT
        sgicpayments.id,
        sgicpayments."custId",
        customers.name,
        sgicpayments."pAmt",
        sgicpayments."tAmt",
        sgicpayments."pDate",
        sgicpayments."tDate",
        sgicpayments."product_id",
        sgicpayments."product_subid",
        product."product_name",
        product."product_subname"
      FROM sgicpayments
      JOIN product
        ON sgicpayments."product_id" = product."product_id"
      AND sgicpayments."product_subid" = product."product_subid"
      JOIN customers
        ON sgicpayments."custId" = customers."id"
      WHERE sgicpayments.status = '1'
      ORDER BY "pDate" DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return sgicField;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all sgicpayments.');
  }
}

export async function fetchSboardPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
      FROM sgicpayments
      WHERE status = '1'
    `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchSboardById(id: string) {
  try {
    const data = await sql<SbordForm[]>`
      SELECT
        sgicpayments.id,
        sgicpayments."custId",
        sgicpayments."pAmt",
        sgicpayments."tAmt",
        sgicpayments."pDate",
        sgicpayments."tDate",
        sgicpayments."product_id",
        sgicpayments."product_subid"
       FROM sgicpayments
      WHERE sgicpayments.id = ${id}
        AND sgicpayments.status = '1';
    `;

    const sbord = data.map((sbord) => ({
      ...sbord,
    }));

    return sbord[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

// 장비
const ITEMS_PER_PAGE_EQ = 5;
export async function fetchEqEmployeesPages(query: string, type:string) {
  try {
    const data = await sql`
        SELECT DISTINCT
               COUNT(A.*)
          FROM eq_info A
         INNER JOIN eq_model B 
            ON A.model_id = B.model_id 
          LEFT OUTER JOIN eq_emp C
            ON A.emp_id = C.emp_id
         WHERE A.use_yn = 'Y'  
           AND ((nullif(${type},'') IS NULL AND 1=1 ) OR
                ('S' = ${type} AND A.eq_sn ILIKE ${`%${query}%`}) OR
                ('M' = ${type} AND B.model_nm ILIKE ${`%${query}%`}) OR
                ('E' = ${type} AND C.emp_nm ILIKE ${`%${query}%`}))
    `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE_EQ);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of EqEmployees.');
  }
}

export async function fetchEqEmployeesSerch(
  query: string,
  currentPage: number,
  type:string,
) {
  try {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE_EQ;
    const sgicField = await sql<EqEmployeesField[]>`
      SELECT
             ROW_NUMBER() OVER(ORDER BY T.eq_id) AS seq
           , T.eq_id
           , T.eq_sn
           , T.model_id
           , T.manu_nm
           , T.model_nm
           , T.model_class
           , T.model_spec
           , T.eq_state
           , T.eq_state_detail
           , T.eq_use
           , T.emp_id
           , T.emp_nm
           , T.purc_dt
           , T.dest_dt
        FROM (SELECT DISTINCT
                     A.eq_id
                   , A.eq_sn
                   , A.model_id
                   , B.manu_nm
                   , B.model_nm
                   , B.model_class
                   , B.model_spec
                   , A.eq_state
                   , A.eq_state_detail
                   , A.eq_use
                   , A.emp_id
                   , C.emp_nm
                   , A.purc_dt
                   , A.dest_dt
                FROM eq_info A
               INNER JOIN eq_model B 
                  ON A.model_id = B.model_id 
                LEFT OUTER JOIN eq_emp C
                  ON A.emp_id = C.emp_id
               WHERE A.use_yn = 'Y'  
                 AND ((nullif(${type},'') IS NULL AND 1=1 ) OR
                      ('S' = ${type} AND A.eq_sn ILIKE ${`%${query}%`}) OR
                      ('M' = ${type} AND B.model_nm ILIKE ${`%${query}%`}) OR
                      ('E' = ${type} AND C.emp_nm ILIKE ${`%${query}%`}))
              ) T
          ORDER BY T.eq_id ASC
          LIMIT ${ITEMS_PER_PAGE_EQ} OFFSET ${offset}
    `;

    return sgicField;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all sgicpayments.');
  }
}