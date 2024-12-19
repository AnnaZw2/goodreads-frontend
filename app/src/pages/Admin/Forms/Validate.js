import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
  title: Yup.string().trim().min(3,"Must be min 3 characters").required("Title is required"),
  author: Yup.string().trim().required("Author is required"),
  description: Yup.string().trim().required("Description is required"),
  part_of_series: Yup.number()
    .required("Part of series is required")
    .positive("Part of series must be a positive number"),
  edition: Yup.string().trim().required("Edition is required"),
  number_of_pages: Yup.number()
    .required("Number of pages is required")
    .positive("Number of pages must be a positive number"),
  cover: Yup.string().trim().required("URL for cover image is required"),
  serie: Yup.string().trim().required("Name of series is required"),
  publisher: Yup.string().trim().required("Publisher is required"),
  publishing_date: Yup.string().trim().required("Publishing date is required"),
});
