import { Category } from ".prisma/client";
import { type FC, useId } from "react";
import { Button } from "~/components/ui/button";
import { useAccount } from "wagmi";
import { type SubmitHandler, useForm } from "react-hook-form";
import TextField from "~/components/textField";
import SelectField from "~/components/selectField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "~/utils/api";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

type Props = {
  closeModal: () => void;
  onCreate: () => Promise<void>;
};

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

const formDataSchema = yup.object({
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

const CreatePartnershipModal: FC<Props> = ({ closeModal, onCreate }) => {
  const formId = useId();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<CreatePartnershipFormInput>({
    mode: "onBlur",
    resolver: yupResolver(formDataSchema),
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
  const { address, isConnected } = useAccount();

  console.log(errors);

  const onSubmit: SubmitHandler<CreatePartnershipFormInput> = async (data) => {
    try {
      if (!address)
        throw new Error("Only a connected account can create a partnership.");

      await createPartnership({
        ownerAddress: address,
        ...data,
      });

      await onCreate();
      closeModal();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create Partnership</DialogTitle>
        <DialogDescription>
          Create a partnership to be listed on the partnerships page. Once
          created interested subjects can submit a partnership proposal for you
          to decline or accept. Once you accept a partnership the soulbound NFTs
          which proof your partnerships can be minted in order to immortalize
          the partnership between you and the prospect.
        </DialogDescription>
      </DialogHeader>
      <div>
        <form
          id={formId}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="Project name"
            note="Max. 200 characters"
            className="md:col-span-2"
            {...register("projectName")}
            error={errors.projectName?.message}
          />
          <TextField
            label="Partnership title"
            note="Max. 200 characters"
            {...register("title")}
            error={errors.title?.message}
          />
          <TextField
            label="Twitter link"
            {...register("twitterURI")}
            error={errors.twitterURI?.message}
          />
          <TextField
            label="Website URL"
            {...register("websiteURI")}
            error={errors.websiteURI?.message}
          />
          <SelectField
            label="Category"
            name="category"
            control={control}
            options={categoryOptions}
          />
          <TextField
            label="Description"
            note="Max. 2000 characters"
            className="md:col-span-2"
            {...register("description")}
            error={errors.description?.message}
          />
        </form>
      </div>
      <DialogFooter>
        <Button
          type="button"
          form={formId}
          variant="secondary"
          onClick={closeModal}
        >
          Cancel
        </Button>
        <div>
          <Button
            type="submit"
            disabled={!isConnected || !isValid}
            form={formId}
          >
            Create Partnership
          </Button>
          {!isConnected && (
            <p className="mt-2 text-xs text-red-400">
              You need to connect your wallet in order to use this
              functionality!
            </p>
          )}
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default CreatePartnershipModal;
