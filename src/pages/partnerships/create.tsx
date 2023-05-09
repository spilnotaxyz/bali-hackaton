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

type CreatePartnershipForm = Omit<
  Partnership,
  "id" | "createdAt" | "category"
> & {
  category: Category | "";
};

const CreatePartnershipPage: NextPage = () => {
  const formId = useId();
  const [formData, setFormData] = useState<CreatePartnershipForm>({
    title: "",
    category: "",
    twitterURI: "",
    websiteURI: "",
    description: "",
    ownerAddress: "",
    signature: "",
  });

  const handleTextInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isNameKeyOfFormData(event.target.name)) {
      updateFormData(event.target.name, event.target.value);
    } else
      console.warn(
        "The name attribute of the form control does not match any key of the provided form data."
      );
  };

  const handleCategorySelectChange = (value: string) => {
    updateFormData("category", value);
  };

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (isNameKeyOfFormData(event.target.name)) {
      const truncatedValue = event.target.value
        .split(" ")
        .slice(0, 200)
        .join(" ");
      updateFormData(event.target.name, truncatedValue);
    } else
      console.warn(
        "The name attribute of the form control does not match any key of the provided form data."
      );
  };

  const isNameKeyOfFormData = (
    name: string
  ): name is keyof CreatePartnershipForm => {
    console.log(name);
    return name in formData;
  };

  const updateFormData = (name: keyof CreatePartnershipForm, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const renderTextInput = (id: string, name: keyof CreatePartnershipForm) => (
    <Input
      id={id}
      name={name}
      value={formData[name]}
      onChange={handleTextInputChange}
    />
  );

  const renderCategorySelect = (id: string) => (
    <Select
      name="category"
      value={formData.category || undefined}
      onValueChange={handleCategorySelectChange}
    >
      <SelectTrigger id={id}>
        <SelectValue placeholder="Select" />
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

  const renderTextArea = (id: string, name: keyof CreatePartnershipForm) => (
    <Textarea
      id={id}
      name={name}
      value={formData.description}
      onChange={handleTextAreaChange}
      className="resize-none"
    />
  );

  const formGroups: FormGroupProps[] = [
    {
      label: "Project name",
      className: "md:col-span-2",
      renderControl: (id) => renderTextInput(id, "title"),
    },
    {
      label: "Partnership title",
      renderControl: (id) => renderTextInput(id, "twitterURI"),
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
      renderControl: (id) => renderTextArea(id, "description"),
      note: "Max. 200 words",
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
            onSubmit={handleSubmit}
          >
            {formGroups.map((formGroupProps, index) => (
              <FormGroup {...formGroupProps} key={index} />
            ))}
          </form>
          <Button
            form={formId}
            variant="secondary"
            type="submit"
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
