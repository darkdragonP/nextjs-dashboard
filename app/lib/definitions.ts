// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type ProductsField = {
  product_id: string;
  product_subid: string;
  product_name: string;
  product_subname: string;
};

export type SgicField = {
  id: string;
  custId: string;
  name: string;
  pAmt: number; 
  tAmt: number;
  pDate: string;
  tDate: string;
  product_id: string;
  product_subid: string;
  product_name: string;
  product_subname: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type SbordForm = {
  id: string;
  custId: string;
  name: string;
  pAmt: number; 
  tAmt: number;
  pDate: string;
  tDate: string;
  product_id: string;
  product_subid: string;
  product_name: string;
  product_subname: string;
};

export type EqEmployeesField = {
  seq : string;
  eq_id : string|'';
  eq_sn : string;
  manu_nm : string;
  model_id : string;
  model_nm : string;
  model_class : string;
  model_spec: string;
  eq_state: string;
  eq_state_detail: string;
  eq_use: string;
  emp_id : string;
  emp_nm : string;
  purc_dt : string;
  dest_dt: string;
}
