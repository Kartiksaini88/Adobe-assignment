import axios from "axios";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

const UpdatePost = ({ openpostmodal, setpostmodal, handlechange ,onepost , getPosts}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

      axios.patch(`https://zealous-garters-dog.cyclic.app/posts/${onepost._id}`,onepost)
      .then((res)=>(console.log(res.data),setpostmodal(false),getPosts()))
      .catch((err)=>console.log(err))
  };
  return (
    <div>
      <Modal
        size="lg"
        isOpen={openpostmodal}
        toggle={() => setpostmodal(!openpostmodal)}
      >
        <ModalHeader toggle={() => setpostmodal(!openpostmodal)}>
          Update Post
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col lg={12}>
                <div>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Content
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="content"
                      rows={3}
                      className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                      required={true}
                      onChange={handlechange}
                      value={onepost.content}
                      defaultValue={""}
                    />
                  </div>
                  <label htmlFor=""></label>
                  <Input
                    type="submit"
                    style={{
                      backgroundColor: "rgb(31,41,55)",
                      color: "white",
                    }}
                  ></Input>
                </div>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UpdatePost;
