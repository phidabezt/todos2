import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import classes from "./Modal.module.scss";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Type something ...")
    .matches(/^\s*\S[\s\S]*$/, "This field cannot contain only blankspaces")
    .min(5, "At least 5 character")
    .max(50, "Maximum length is 50"),
});

function Modal(props) {
  const { addTodo, todoEdit, editTodo, setIsModalOpen } = props;

  const modalContent = {
    initialValues: todoEdit.id ? todoEdit.name : "",
    title: todoEdit.id ? "Update your todo" : "What's your plan?",
    modalPlaceholder: todoEdit.id ? "Changing something ..." : "Add a todo ...",
    buttonName: todoEdit.id ? "Update" : "Add",
    interactiveFunc: todoEdit.id ? editTodo : addTodo,
  };

  return (
    <Formik
      initialValues={{ name: modalContent.initialValues }}
      onSubmit={(values, actions) => {
        actions.resetForm();
        actions.setSubmitting(false);
        modalContent.interactiveFunc(values.name);
      }}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {(formikProps) => (
        <div
          className={`${classes["modal__container"]} modal show`}
          id="modelId"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div
            className={`${classes["modal__dialog"]} modal-dialog`}
            role="document"
          >
            <div className={`${classes["modal__content"]} modal-content`}>
              <div className="modal-header">
                <h5 className="modal-title">{modalContent.title}</h5>
              </div>
              <div className="modal-body">
                <Form className={`${classes["modal__form"]}`}>
                  <Field
                    type="text"
                    name="name"
                    id={`${classes["modal__input"]}`}
                    placeholder={modalContent.modalPlaceholder}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={`${classes["modal__error"]}`}
                  />
                  <button
                    className={`${classes["modal__button"]}`}
                    type="submit"
                  >
                    {modalContent.buttonName}
                  </button>
                </Form>
              </div>
              <div className="modal-footer">
                <button
                  type="reset"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => {
                    setIsModalOpen((prev) => (prev = !prev));
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Modal;
