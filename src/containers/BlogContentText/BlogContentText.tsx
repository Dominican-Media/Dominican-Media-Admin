"use client";

import ArrowBack from "@/assets/svgIcons/ArrowBack";
import Button from "@/components/Button/Button";
import { IMAGES } from "@/utilities/constants";
import { routes } from "@/utilities/routes";
import { Check } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import classes from "./BlogContentText.module.css";

const BlogContentText = () => {
  // Router
  const router = useRouter();

  return (
    <section className={classes.container}>
      <Image
        src={IMAGES.FEATURED_BLOG}
        alt="Blog Title"
        height={500}
        width={500}
      />

      <div className={classes.textSection}>
        It’s a typical down-on-the-dock scene in Maine. A handful of old-timers
        who have cruised this coast for better than a half-century share stories
        about favorite anchorages, shoreside hikes and precious swimming
        quarries. For them, the islands of Maine make life worth living, and the
        chance to sail among them summer after summer has more than justified
        the annual expense and effort they put into maintaining their sailboats.
        And then along comes Steve Stone and Amy Tunney, relative newcomers to
        town. Each is carrying a dry bag and wearing a backpack in preparation
        for a camp-­cruising voyage down Blue Hill Bay. Once out in the open
        water, they’ll make a final assessment of the wind forecast over
        the coming days, and they’ll ease off toward Acadia National Park to
        port, or toward Merchant Row and Vinalhaven to starboard... Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Iusto esse commodi
        similique itaque. Voluptatem, possimus dolores. Molestias nulla ad esse
        suscipit consequatur obcaecati eius fugit atque accusamus, rerum
        corrupti quis. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quas laboriosam rerum nostrum. Laboriosam ipsa non harum assumenda
        aperiam recusandae doloremque, aliquam pariatur hic minima nisi
        obcaecati eveniet commodi quam rem excepturi nulla cupiditate nemo, in
        odit at illum rerum quod? Doloribus deserunt quo optio libero quasi,
        dolorum asperiores ea numquam doloremque ut id earum architecto, ex
        accusantium sint corporis odio praesentium harum, voluptate autem.
        Praesentium quibusdam culpa, delectus corporis sunt vel libero
        blanditiis tempora, quidem vitae rerum, debitis distinctio nostrum
        quisquam velit labore dolore consectetur. Nesciunt sapiente illo
        reprehenderit distinctio eius adipisci possimus, temporibus animi in
        dicta alias error vitae?
      </div>

      <div className={classes.buttonSection}>
        <Button
          type="secondary"
          onClick={() => {
            router.push(routes.CREATE_BLOG);
          }}
        >
          <ArrowBack />
          <span>Continue editing</span>
        </Button>

        <Button>
          <Check color="inherit" style={{ color: "#fff" }} />
          <span>Publish</span>
        </Button>
      </div>
    </section>
  );
};

export default BlogContentText;
