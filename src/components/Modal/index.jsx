import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import classes from "./Modal.module.scss";
import InputField from "../InputField";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Type something ...")
    .matches(/^\s*\S[\s\S]*$/, "This field cannot contain only blankspaces")
    .min(5, "At least 5 character")
    .max(50, "Maximum length is 50"),
});

function Modal(props) {
  const { addTodo, todoSelected, editTodo, setIsModalOpen } = props;

  const modalContent = {
    initialValues: todoSelected.id ? todoSelected.name : "",
    title: todoSelected.id ? "Update your todo" : "What's your plan?",
    modalPlaceholder: todoSelected.id
      ? "Changing something ..."
      : "Add a todo ...",
    buttonName: todoSelected.id ? "Update" : "Add",
    interactiveFunc: todoSelected.id ? editTodo : addTodo,
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
          className={`${classes["modal"]} modal show`}
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
                    name="name"
                    component={InputField}
                    id="modal__input"
                    placeholder={modalContent.modalPlaceholder}
                    button-name={modalContent.buttonName}
                  />
                </Form>
              </div>
              <div className="modal-footer">
                <button
                  type="reset"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => {
                    setIsModalOpen(false);
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
