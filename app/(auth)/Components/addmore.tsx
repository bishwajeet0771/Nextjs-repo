"use client";
import React from "react";
import { Group, ActionIcon, Box, Text } from "@mantine/core";
import { TextInput } from "react-hook-form-mantine";
import { FaPlus } from "react-icons/fa";
import { randomId } from "@mantine/hooks";
import StepCss from "@/app/styles/Stepper.module.css";
import {
  handleTrimAndReplaceReactHookForm,
} from "@/app/utils/input/validations";
import { CrossIcon } from "@/app/images/commonSvgs";
import { useFieldArray } from "react-hook-form";
import { MAX_LENTH_TEXT } from "@/app/validations/auth";
type Props = {
  id: any;
  placeholder: string;
  label: string;
  form: any;
  // eslint-disable-next-line no-unused-vars
  scrollToBottom: (customValue?: number) => void;
};
// type Item = {
//   name: string;
//   active: boolean;
//   key: string;
// };

export default function AddmoreInput({
  id,
  form,
  placeholder,
  label,
  scrollToBottom,
}: Props) {
  const {
    fields: values,
    remove,
    insert,
  } = useFieldArray<any>({
    control: form.control,
    name: id,
  });

  const fields = values.map((item: any, index: number) => (
    <Group key={item.key}>
      <TextInput
        control={form.control}
        name={`${id}.${index}.name`}
        rightSection={
          index != 0 && (
            <ActionIcon
              className="!p-1 hover:!bg-gray-300"
              color="white"
              onClick={() => remove(index)}
            >
              <CrossIcon />
            </ActionIcon>
          )
        }
        id={id}
        required={index == 0 ? true : false}
        size="lg"
        {...(index == 0 ? { mt: 0 } : { mt: "md" })}
        {...(index == 3 && { mb: "xs" })}
        label={index != 0 ? `${label} ${index + 1}` : label}
        placeholder={placeholder}
        key={`${id[index]}`}
        classNames={{
          root: StepCss.inputRoot,
          input: StepCss.textInput,
          error: StepCss.errorMsg,
          label: StepCss.mlabelCss,
        }}
        onBlurCapture={(e) => {
          handleTrimAndReplaceReactHookForm(
            e,
            `${id}.${index}.name`,
            form.setValue
          );
          e.target.value !== "" &&
            setTimeout(() => {
              scrollToBottom();
            }, 100);
        }}
        maxLength={MAX_LENTH_TEXT}
        // onBlur={()=>form.validateField(`${id}.${index}.name`)}
      />

      {/* <Switch
            label="Active"
            key={form.key(`employees.${index}.active`)}
            {...form.getInputProps(`employees.${index}.active`, { type: 'checkbox' })}
          /> */}
    </Group>
  ));
  return (
    <Box maw={500} mx="auto">
      {}
      {fields.length > 0 ? (
        <Group>
          {/*  <Text fw={500} size="sm" pr={90}>
      Status
    </Text> */}
        </Group>
      ) : (
        <Text c="dimmed" ta="center">
          No one here...
        </Text>
      )}
      {fields}

      {fields.length < 4 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            insert(fields.length, { name: "", active: false, key: randomId() });
            // form.insertListItem(id, {
            //   name: "",
            //   active: false,
            //   key: randomId(),
            // });
          }}
          className=" ml-auto flex justify-end mt-1 bg-blue-500 hover:bg-blue-700 text-white  text-[12px] py-[1px]  rounded focus:outline-none focus:shadow-outline items-center font-semibold px-1"
          type="button"
        >
          <FaPlus className="mr-1" /> Add More
        </button>
      )}
    </Box>
  );
}
