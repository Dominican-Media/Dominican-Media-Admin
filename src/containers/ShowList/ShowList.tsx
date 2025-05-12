import Modal from "@/components/Modal/Modal";
import ShowCard from "@/components/ShowCard/ShowCard";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { SHOWS } from "@/utilities/constants";
import { modalGenericType } from "@/utilities/types";
import { useState } from "react";
import AddPresenterModalBody from "../AddPresenterModalBody/AddPresenterModalBody";
import CreateSeasonModalBody from "../CreateSeasonModalBody/CreateSeasonModalBody";
import ShowDetailModalBody from "../ShowDetailModalBody/ShowDetailModalBody";
import classes from "./ShowList.module.css";

const ShowList = () => {
  // Hooks
  const { updateSearchParams, updateConcurrentSearchParams } =
    useUpdateSearchParams();

  // Router
  const show = updateSearchParams("show", undefined, "get");

  //   Utils
  const closeShow = () => {
    updateSearchParams("show", undefined, "delete");
    updateConcurrentSearchParams({
      show: {
        method: "delete",
      },
      edit: {
        method: "delete",
      },
    });
  };

  //   States
  const [modals, setModals] = useState<modalGenericType>({
    createEpisode: false,
    createSeason: false,
    addPresenter: false,
  });

  return (
    <>
      {show && (
        <Modal
          onClick={() => {
            closeShow();
          }}
          body={
            <ShowDetailModalBody
              onClose={() => {
                closeShow();
              }}
              onCreateSeason={() => {
                if (show) {
                  closeShow();
                }
                setAllModalsFalse(setModals);
                setModalTrue(setModals, "createSeason");
              }}
              onCreatePresenter={() => {
                if (show) {
                  closeShow();
                }
                setAllModalsFalse(setModals);
                setModalTrue(setModals, "addPresenter");
              }}
            />
          }
        />
      )}

      {modals.createSeason && (
        <Modal
          body={
            <CreateSeasonModalBody
              onGoBack={() => {
                setAllModalsFalse(setModals);
                updateConcurrentSearchParams({
                  show: {
                    method: "set",
                    value: "1",
                  },
                  edit: {
                    method: "set",
                    value: "true",
                  },
                });
              }}
            />
          }
          onClick={() => {
            if (show) {
              closeShow();
              setAllModalsFalse(setModals);
            }
            setAllModalsFalse(setModals);
          }}
        />
      )}

      {modals.addPresenter && (
        <Modal
          body={
            <AddPresenterModalBody
              onGoBack={() => {
                setAllModalsFalse(setModals);
                updateConcurrentSearchParams({
                  show: {
                    method: "set",
                    value: "1",
                  },
                  edit: {
                    method: "set",
                    value: "true",
                  },
                });
              }}
            />
          }
          onClick={() => {
            if (show) {
              closeShow();
              setAllModalsFalse(setModals);
            }
            setAllModalsFalse(setModals);
          }}
        />
      )}

      <section className={classes.container}>
        <div className={classes.shows}>
          {SHOWS.map((data) => {
            return <ShowCard {...data} key={data?.title} />;
          })}
        </div>
      </section>
    </>
  );
};

export default ShowList;
