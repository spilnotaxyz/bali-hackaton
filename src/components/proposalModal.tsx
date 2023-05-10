import { type SubmitHandler, useForm } from "react-hook-form";
import TextField from "./textField";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { type FC, useId } from "react";
import { api } from "~/utils/api";
import { useAccount } from "wagmi";
import { type Proposal } from "@prisma/client";

type Props = {
  canEdit: boolean;
  proposal: Proposal | null;
  partnershipId: string;
  closeModal: () => void;
  onCreate: () => Promise<void>;
};

type ProposalFormInput = {
  name: string;
  twitterURI: string;
  websiteURI: string;
  comment: string;
  occupation: string;
};

const formDataSchema = yup.object({
  name: yup.string().max(200, "Too long").required("Required"),
  comment: yup.string().max(200, "Too long").required("Required"),
  occupation: yup.string().max(200, "Too long").required("Required"),
  twitterURI: yup.string().url("Not a valid url").required("Required"),
  websiteURI: yup.string().url("Not a valid url").required("Required"),
});

const ProposalModal: FC<Props> = ({
  canEdit,
  proposal,
  partnershipId,
  closeModal,
  onCreate,
}) => {
  const formId = useId();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProposalFormInput>({
    mode: "onBlur",
    resolver: yupResolver(formDataSchema),
    defaultValues: {
      name: proposal?.name ?? "",
      twitterURI: proposal?.twitterURI ?? "",
      websiteURI: proposal?.websiteURI ?? "",
      comment: proposal?.comment ?? "",
      occupation: proposal?.occupation ?? "",
    },
  });
  const { mutateAsync } = api.proposal.createProposal.useMutation();
  const { address } = useAccount();

  const onSubmit: SubmitHandler<ProposalFormInput> = async (formData) => {
    try {
      if (!address)
        throw new Error("Only a connected account can create a partnership.");

      await mutateAsync({
        ...formData,
        partnerAddress: address,
        partnershipId,
      });

      await onCreate();
      closeModal();
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {canEdit
            ? "Create a Proposal"
            : `Proposal from ${proposal?.name ?? ""}`}
        </DialogTitle>
        {canEdit && (
          <DialogDescription>
            Once the proposal is submitted the project owner will be notified
            and will be able to accept or reject the proposal. Once accepted you
            as the partner will be able to mint the partnership NFTs for both
            parties.
          </DialogDescription>
        )}
      </DialogHeader>
      <div>
        <form
          id={formId}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="Company name"
            note="Max. 200 characters"
            className="md:col-span-2"
            {...register("name")}
            error={errors.name?.message}
            disabled={!canEdit}
          />
          <TextField
            label="Comment"
            note="Max. 200 characters"
            {...register("comment")}
            error={errors.comment?.message}
            disabled={!canEdit}
          />
          <TextField
            label="Occupation"
            note="Max. 200 characters"
            {...register("occupation")}
            error={errors.occupation?.message}
            disabled={!canEdit}
          />
          <TextField
            label="Twitter URL"
            {...register("twitterURI")}
            error={errors.twitterURI?.message}
            disabled={!canEdit}
          />
          <TextField
            label="Website URL"
            {...register("websiteURI")}
            error={errors.websiteURI?.message}
            disabled={!canEdit}
          />
        </form>
      </div>
      <DialogFooter>
        <Button
          type="button"
          form={formId}
          variant={canEdit ? "secondary" : "default"}
          onClick={closeModal}
        >
          {canEdit ? "Cancel" : "Close"}
        </Button>
        {canEdit && (
          <Button type="submit" form={formId}>
            Confirm
          </Button>
        )}
      </DialogFooter>
    </DialogContent>
  );
};
export default ProposalModal;
