'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const sql = postgres(process.env.DATABASE_URL!, {ssl: 'require'});

const FormSchemaInvoice = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const CreateInvoice = FormSchemaInvoice.omit({ id: true, date: true });
const UpdateInvoice = FormSchemaInvoice.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields  = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0]; // Format date as YYYY-MM-DD

   // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      messages: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, prevState: State, formData: FormData) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }
  
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
        `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}

// Sboard 함수
const FormSchemaBoard = z.object({
  id: z.string(),
  custId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  pAmt: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
  pDate: z.string(),
  tAmt: z.coerce.number(),
  tDate: z.string().nullable(),
  product_id: z.string(),
  product_subid: z.string(),
});

// 수정 FormSchemaUBoard
const FormSchemaUBoard = z.object({
  id: z.string(),
  tAmt: z.coerce.number(),
  tDate: z.string().nullable(),
});

const CreateSbaord = FormSchemaBoard.omit({ id: true });
const UpdateSbaord = FormSchemaUBoard.omit({ id: true });

export type SboardState = {
  errors?: {
    custId?: string[];
    pAmt?: string[];
    pDate?: string[];
    tAmt?: string[];
    tDate?: string[]; 
    product_id?: string[];
    product_subid?: string[];
  };
  message?: string | null;
};

export type SboardUState = {
  errors?: {
    tAmt?: string[];
  };
  message?: string | null;
};

//Sboard specific actions
export async function createSboard(prevState: SboardState, formData: FormData) {
  // Validate form using Zod
  const validatedFields  = CreateSbaord.safeParse({
    custId: formData.get('custId'),
    pAmt: formData.get('pAmt'),
    pDate: formData.get('pDate')||null,
    tAmt: formData.get('tAmt'),
    tDate: formData.get('tDate')||null,
    product_id: formData.get('product_id'),
    product_subid: formData.get('product_subid')
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Sboard.',
    };
  } 

  // Prepare data for insertion into the database
  const { custId, tAmt, tDate, pAmt, pDate, product_id, product_subid } = validatedFields.data;

  const tAmta = tAmt; //parseInt( tAmt.replace(/,/g, '') ); // Convert to integer if formatted with commas
  const pAmta = pAmt; // parseInt( pAmt.replace(/,/g, '') ); // Convert to integer if formatted with commas
   // Insert data into the database
  try {
    await sql`
      INSERT INTO sgicpayments ("custId", "tAmt", "tDate", "pAmt", "pDate", product_id, product_subid, status)
      VALUES (${custId}, ${tAmta}, ${tDate}, ${pAmta}, ${pDate}, ${product_id}, ${product_subid}, '1')
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      messages: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate the cache for the s-board page and redirect the user.
  revalidatePath('/dashboard/s-board');
  redirect('/dashboard/s-board');
}

export async function updateSboard(id: string, prevState: SboardUState, formData: FormData) {
  const validatedFields = UpdateSbaord.safeParse({
    tAmt: formData.get('tAmt'),
    tDate: formData.get('tDate'),
  });
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Sboard.',
    };
  }
  
  const { tAmt, tDate } = validatedFields.data;
  const tAmta = tAmt; //parseInt(tAmt.replace(/,/g, '')); // Convert to integer if formatted with commas

  try {
    await sql`
        UPDATE sgicpayments
           SET "tAmt" = ${tAmta}
             , "tDate" = ${tDate}
         WHERE id = ${id}
        `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update SBOARD.' };
  }

  revalidatePath('/dashboard/s-board');
  redirect('/dashboard/s-board');
}

export async function deleteSboard(id: string) {
  await sql`UPDATE sgicpayments SET status = '2' WHERE id = ${id}`;
  revalidatePath('/dashboard/s-board');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
