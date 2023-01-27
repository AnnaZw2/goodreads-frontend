import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  description: Yup.string().required("Description is required"),
  part_of_series: Yup.number()
    .required("Part of series is required")
    .positive("Part of series must be a positive number"),
  edition: Yup.string().required("Edition is required"),
  number_of_pages: Yup.number()
    .required("Number of pages is required")
    .positive("Number of pages must be a positive number"),
  cover: Yup.string().required("URL for cover image is required"),
  serie: Yup.string().required("Name of series is required"),
  publisher: Yup.string().required("Publisher is required"),
  publishing_date: Yup.string().required("Publishing date is required"),
});
