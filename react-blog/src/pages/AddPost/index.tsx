import { Form, Formik } from "formik";
import { useState } from "react";
import { CommonButton, TextField } from "../../components";
import { createPost } from "../../services/blog";

const readFile = (file) =>
  new Promise((res) => {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      res(new Uint8Array(fileReader.result as unknown as number));
    };

    fileReader.readAsArrayBuffer(file);
  });

export const AddPost = () => {
  const [file, setFile] = useState();

  const onSubmit = async (values) => {
    await createPost({
      title: values.title,
      description: values.description,
      lesson_num: values.lessonNumber,
      text: values.text,
      image: file,
    });
  };

  console.log(file);

  const onImageChange = async (event) => {
    if (event.target.files?.length) {
      const arr = await Promise.all<any[]>(
        Array.from(event.target.files).map(async (file) => {
          return await readFile(file);
        })
      );

      setFile(arr[0]);
    }
  };

  return (
    <Formik initialValues={{}} onSubmit={onSubmit}>
      <Form>
        <TextField name="title" label="Title" />
        <TextField name="lessonNumber" label="Lesson number" type="number" />
        <TextField
          name="image"
          type="file"
          label="Image"
          onChange={onImageChange}
          multiple
        />
        {file && <img src={file} />}
        <TextField name="description" label="Description" multiline />
        <TextField name="text" label="Text" multiline />
        <CommonButton withWholeWidth>Add Post</CommonButton>
      </Form>
    </Formik>
  );
};
