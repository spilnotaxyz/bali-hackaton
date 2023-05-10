import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { type NextPage } from "next";
import FormGroup, { type FormGroupProps } from "~/components/formGroup";
import { Input } from "~/components/ui/input";
import { type Partnership, Category } from "@prisma/client";
import { type ChangeEvent, useState, type FormEvent, useId } from "react";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { useAccount, useSignTypedData } from "wagmi";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

type CreatePartnershipForm = Omit<
  Partnership,
  "id" | "createdAt" | "signature" | "ownerAddress"
>;

type TypedDataSignatureTypes = {
  CreatePartnershipForm: {
    name: keyof CreatePartnershipForm;
    type: "string";
  }[];
};

const CreatePartnershipPage: NextPage = () => {
  const { address } = useAccount();
  const formId = useId();
  const [formData, setFormData] = useState<CreatePartnershipForm>({
    projectName: "",
    title: "",
    category: Category.ADVISOR,
    twitterURI: "",
    websiteURI: "",
    description: "",
  });
  const router = useRouter();

  const typedDataSignatureTypes: TypedDataSignatureTypes = {
    CreatePartnershipForm: [
      { name: "title", type: "string" },
      { name: "category", type: "string" },
      { name: "twitterURI", type: "string" },
      { name: "websiteURI", type: "string" },
      { name: "description", type: "string" },
    ],
  };

  const { signTypedDataAsync } = useSignTypedData({
    domain: {},
    types: typedDataSignatureTypes,
    value: formData,
  });

  const { mutateAsync } = api.partnership.createPartnership.useMutation();

  const handleFormControlChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    maxChars?: number
  ) => {
    if (isNameKeyOfFormData(event.target.name)) {
      updateFormData(event.target.name, event.target.value.slice(0, maxChars));
    } else
      console.warn(
        "The name attribute of the form control does not match any key of the provided form data."
      );
  };

  const handleCategorySelectChange = (value: string) => {
    updateFormData("category", value);
  };

  const isNameKeyOfFormData = (
    name: string
  ): name is keyof CreatePartnershipForm => {
    return name in formData;
  };

  const updateFormData = (name: keyof CreatePartnershipForm, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      if (!address)
        throw new Error("Only a connected account can create a partnership.");
      event.preventDefault();
      const signature = await signTypedDataAsync();
      await mutateAsync({
        projectName: formData.projectName,
        title: formData.title,
        category: formData.category,
        twitterURI: formData.twitterURI,
        websiteURI: formData.websiteURI,
        description: formData.description,
        ownerAddress: address,
        signature,
      });
      await router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const renderTextInput = (
    id: string,
    name: keyof CreatePartnershipForm,
    maxChars?: number
  ) => (
    <Input
      id={id}
      name={name}
      value={formData[name]}
      onChange={(event) => handleFormControlChange(event, maxChars)}
    />
  );

  const renderCategorySelect = (id: string) => (
    <Select
      name="category"
      value={formData.category || undefined}
      onValueChange={handleCategorySelectChange}
    >
      <SelectTrigger id={id}>
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(Category).map((category, index) => (
          <SelectItem value={category} key={index}>
            {category.charAt(0) + category.slice(1).toLowerCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  const renderTextArea = (
    id: string,
    name: keyof CreatePartnershipForm,
    maxChars?: number
  ) => (
    <Textarea
      id={id}
      name={name}
      value={formData.description}
      onChange={(event) => handleFormControlChange(event, maxChars)}
      className="resize-none"
    />
  );

  const formGroupsProps: FormGroupProps[] = [
    {
      label: "Project name",
      className: "md:col-span-2",
      renderControl: (id) => renderTextInput(id, "projectName", 200),
      note: "Max. 200 characters",
    },
    {
      label: "Partnership title",
      renderControl: (id) => renderTextInput(id, "title", 200),
      note: "Max. 200 characters",
    },
    {
      label: "Twitter link",
      renderControl: (id) => renderTextInput(id, "twitterURI"),
    },
    {
      label: "Website URL",
      renderControl: (id) => renderTextInput(id, "websiteURI"),
    },
    {
      label: "Category",
      renderControl: (id) => renderCategorySelect(id),
    },
    {
      label: "Description",
      className: "md:col-span-2",
      renderControl: (id) => renderTextArea(id, "description", 2000),
      note: "Max. 2000 characters",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-900 to-sky-950 py-16">
      <div className="container">
        <h1 className="text-2xl font-bold text-white">Create a partnership</h1>
        <div className="mt-4 rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 p-12 text-white">
          <form
            id={formId}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
            onSubmit={(event) => {
              void handleSubmit(event);
            }}
          >
            {formGroupsProps.map((formGroupProps, index) => (
              <FormGroup {...formGroupProps} key={index} />
            ))}
          </form>
          <Button
            form={formId}
            variant="secondary"
            type="submit"
            className="ml-auto mt-8 block"
            // TODO: More sophisticated client validation should be included
            disabled={Object.values(formData).some((value) => !value)}
          >
            Create partnership
          </Button>
        </div>
      </div>
    </main>
  );
};

export default CreatePartnershipPage;
