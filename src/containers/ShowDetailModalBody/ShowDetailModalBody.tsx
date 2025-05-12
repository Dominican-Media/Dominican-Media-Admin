import Button from "@/components/Button/Button";
import EpisodesCard from "@/components/EpisodesCard/EpisodesCard";
import ServicesCard from "@/components/ServicesCard/ServicesCard";
import { IMAGES } from "@/utilities/constants";
import { PlayArrow } from "@mui/icons-material";
import Image from "next/image";
import classes from "./ShowDetailModalBody.module.css";
import { TEAM } from "@/utilities/constants";
import SmallUserCard from "@/components/SmallUserCard/SmallUserCard";
import Pencil from "@/assets/svgIcons/Pencil";
import Plus from "@/assets/svgIcons/Plus";
import TextArea from "@/components/Textarea/Textarea";
import { useRef, useState } from "react";
import Input from "@/components/Input/Input";
import FileUploadInput from "@/components/FileUploadInput/FileUploadInput";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";

type ShowDetailModalBodyType = {
  onClose: () => void;
  onCreateSeason?: () => void;
  onCreatePresenter?: () => void;
};

const ShowDetailModalBody = ({
  onCreateSeason,
  onCreatePresenter,
}: ShowDetailModalBodyType) => {
  // States
  const [showImage, setShowImage] = useState<File[]>([]);

  // Hooks
  const { updateSearchParams } = useUpdateSearchParams();

  // Router
  const edit = updateSearchParams("edit", undefined, "get");
  const isEdit = edit === "true";

  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={classes.container} ref={containerRef}>
      {!isEdit && (
        <div className={classes.videoIframe}>
          <Image
            src={IMAGES.KNOW_YOUR_FAITH}
            alt="Show Name"
            height={400}
            width={400}
          />

          <div className={classes.gradient}></div>
          <div className={classes.textSection}>
            <h2>Title</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur, nisi autem amet dicta doloribus quam nulla illum
              soluta deserunt harum minus similique voluptatem dolore expedita
              voluptatibus? Sequi nihil veniam quae provident ad molestiae
              earum, vero quia odit, fugit iure illo corrupti exercitationem
              eius aut. Placeat numquam voluptatibus eligendi non totam.
            </p>
            <Button
              onClick={() => {
                scrollToTop();
                updateSearchParams("edit", "true", "set");
              }}
            >
              <Pencil />
              <span>Edit Show</span>
            </Button>
          </div>
        </div>
      )}

      <div className={classes.body}>
        <h4 className={classes.header}>Edit Show Details</h4>

        {isEdit && (
          <FileUploadInput
            files={showImage}
            setFiles={setShowImage}
            title="Upload New Show image"
          />
        )}

        <div className={classes.description}>
          <h4>Description</h4>

          {isEdit ? (
            <TextArea
              value={
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit."
              }
            />
          ) : (
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
          )}
        </div>

        <div className={classes.description}>
          <h4>Seasons</h4>

          <div className={classes.seasons}>
            <div>Season 1</div>
            <div>Season 2</div>
            <div>Season 3</div>
            {isEdit && (
              <div
                className={classes.edit}
                onClick={() => onCreateSeason && onCreateSeason()}
              >
                <Plus fill="#000" />
                <span>Add New Season</span>
              </div>
            )}
          </div>
        </div>

        <div className={classes.description}>
          <h4>Episodes</h4>

          <EpisodesCard
            title="Episode 1"
            description={`Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Asperiores, quisquam. Officia mollitia libero pariatur atque enim
            asperiores rem porro illo error! Nisi mollitia eos officiis a
            doloremque nam pariatur, rem quo corporis numquam quos sed facilis.
            Atque id sint quibusdam soluta ipsa tenetur nobis quos fugit
            cupiditate asperiores, voluptatibus quisquam!`}
          />

          <EpisodesCard
            title="Episode 1"
            description={`Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Asperiores, quisquam. Officia mollitia libero pariatur atque enim
            asperiores rem porro illo error! Nisi mollitia eos officiis a
            doloremque nam pariatur, rem quo corporis numquam quos sed facilis.
            Atque id sint quibusdam soluta ipsa tenetur nobis quos fugit
            cupiditate asperiores, voluptatibus quisquam!`}
          />

          <EpisodesCard
            title="Episode 1"
            description={`Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Asperiores, quisquam. Officia mollitia libero pariatur atque enim
            asperiores rem porro illo error! Nisi mollitia eos officiis a
            doloremque nam pariatur, rem quo corporis numquam quos sed facilis.
            Atque id sint quibusdam soluta ipsa tenetur nobis quos fugit
            cupiditate asperiores, voluptatibus quisquam!`}
          />

          {isEdit && (
            <EpisodesCard
              edit
              title="Add New Seasons & Episodes"
              onClick={() => {
                onCreateSeason && onCreateSeason();
              }}
            />
          )}
        </div>

        <div className={classes.description}>
          <h4>Presenters</h4>

          <div className={classes.presenters}>
            {TEAM.map((data) => {
              return (
                <SmallUserCard
                  name={data.name}
                  image={data.images}
                  key={data?.name}
                />
              );
            })}
            {isEdit && (
              <SmallUserCard
                isEdit
                onClick={() => {
                  if (onCreatePresenter) {
                    onCreatePresenter();
                  }
                }}
              />
            )}
          </div>
        </div>

        {isEdit && (
          <div className={classes.buttonSection}>
            <Button
              type="bordered"
              onClick={() => {
                scrollToTop();
                updateSearchParams("edit", undefined, "delete");
              }}
            >
              {" "}
              Cancel
            </Button>
            <Button>Save</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowDetailModalBody;
