import { CreateInvoice } from "@/app/components/CreateInvoice";
import { requireUser } from "@/app/utils/hooks";
import { prisma } from "@/app/utils/prisma";

async function getUserData(UserId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: UserId,
    },
    select: {
      firstName: true,
      lastName: true,
      address: true,
      email: true,
    },
  });
  return data;
}

export default async function InvoiceCreationroute() {
  // const [lastResult,action ]= useActionState(onboardUser,undefined);
  //     const [form,fields] = useForm({
  //         lastResult,

  //         onValidate({formData}){
  //             return parseWithZod(formData, {
  //                 schema: onboardingSChema,
  //             });
  //         },

  //         shouldValidate: "onBlur",
  //         shouldRevalidate: "onInput",
  //     })
  const session = await requireUser();
  const data = await getUserData(session.user?.id as string);
  return (
    <>
      <CreateInvoice
        firstName={data?.firstName as string}
        lastName={data?.lastName as string}
        address={data?.address as string}
        email={data?.email as string}
      />
    </>
  );
}
