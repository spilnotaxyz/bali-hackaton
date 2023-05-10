import { type NextPage } from "next";
import { Category } from ".prisma/client";
import { useId } from "react";
import { Button } from "~/components/ui/button";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { type SubmitHandler, useForm } from "react-hook-form";
import TextField from "~/components/textField";
import SelectField from "~/components/selectField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "~/utils/api";

type CreatePartnershipFormInput = {
  title: string;
  category: Category;
  twitterURI: string;
  websiteURI: string;
  description: string;
  projectName: string;
};

const categoryOptions = [
  { value: Category.MARKETING, label: "Advisor" },
  { value: Category.RESEARCH, label: "Research" },
  { value: Category.AUDIT, label: "Audit" },
  { value: Category.INVESTOR, label: "Investor" },
  { value: Category.COLLAB, label: "Collab" },
  { value: Category.PARTNERSHIPS, label: "Partnerships" },
  { value: Category.OTHER, label: "Other" },
];

const createPartnershiSchema = yup.object({
  title: yup.string().max(200, "Too long").required("Required"),
  category: yup
    .string()
    .required("Required")
    .oneOf([
      "MARKETING",
      "RESEARCH",
      "AUDIT",
      "ADVISOR",
      "INVESTOR",
      "COLLAB",
      "PARTNERSHIPS",
      "OTHER",
    ]),
  twitterURI: yup.string().url("Not a valid url").required("Required"),
  websiteURI: yup.string().url("Not a valid url").required("Required"),
  description: yup.string().max(2000, "Too long").required("Required"),
  projectName: yup.string().max(200, "Too long").required("Required"),
});

const CreatePartnershipPage: NextPage = () => {
  const formId = useId();
  const account = useAccount();
  const router = useRouter();
  const { address } = useAccount();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePartnershipFormInput>({
    mode: "onBlur",
    resolver: yupResolver(createPartnershiSchema),
    defaultValues: {
      title: "",
      twitterURI: "",
      websiteURI: "",
      projectName: "",
      description: "",
      category: "ADVISOR",
    },
  });

  const { mutateAsync: createPartnership } =
    api.partnership.createPartnership.useMutation();

  const onSubmit: SubmitHandler<CreatePartnershipFormInput> = async (data) => {
    try {
      if (!address)
        throw new Error("Only a connected account can create a partnership.");

      await createPartnership({
        ownerAddress: account.address as string,
        ...data,
      });
      await router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-900 to-sky-950 py-16">
      <div className="container">
        <h1 className="text-2xl font-bold text-white">Create a partnership</h1>
        <div className="mt-4 rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 p-12 text-white">
          <form
            id={formId}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              label="Project name"
              className="md:col-span-2"
              note="Max. 200 characters"
              {...register("projectName")}
              error={errors.projectName?.message}
            />
            <TextField
              label="Partnership title"
              className="md:col-span-2"
              note="Max. 200 characters"
              {...register("title")}
              error={errors.title?.message}
            />
            <TextField
              label="Twitter link"
              className="md:col-span-2"
              {...register("twitterURI")}
              error={errors.twitterURI?.message}
            />
            <TextField
              label="Website URL"
              className="md:col-span-2"
              {...register("websiteURI")}
              error={errors.websiteURI?.message}
            />
            <TextField
              label="Description"
              className="md:col-span-2"
              note="Max. 2000 characters"
              {...register("description")}
              error={errors.description?.message}
            />
            <SelectField
              label="Category"
              className="md:col-span-2"
              name="category"
              control={control}
              options={categoryOptions}
            />
          </form>
          <Button
            type="submit"
            form={formId}
            variant="secondary"
            className="ml-auto mt-8 block"
          >
            Create partnership
          </Button>
        </div>
      </div>
    </main>
  );
};

export default CreatePartnershipPage;
