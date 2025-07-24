import Form from '@/app/ui/s-board/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchSboardById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation'; 

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [sboard, customers] = await Promise.all([
    fetchSboardById(id),
    fetchCustomers(),
  ]);
  
  if (!sboard) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 's-board', href: '/dashboard/s-board' },
          {
            label: 'Edit SGI거래',
            href: `/dashboard/s-board/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form sboard={sboard} customers={customers} />
    </main>
  );
}