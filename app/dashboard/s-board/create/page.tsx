import Form from '@/app/ui/s-board/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchProducts } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
  const products = await fetchProducts();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Sboard', href: '/dashboard/s-board' },
          {
            label: 'Create Sgi거래',
            href: '/dashboard/s-board/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} products = {products}/>
    </main>
  );
}