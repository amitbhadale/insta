import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { db, storage, ref, collection, doc, setDoc } from "../firebase";

function ImageUpload({ userName }) {
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    console.log("eeeeee", e);
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    console.log("image issss", image);
  };
  const handleUpload = (e) => {
    const uploadTask = ref(storage, `images/${image.name}`);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (e) => {
        console.log(e.message);
      },
      () => {
        ref(storage, "images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setDoc(doc(db, "posts"), {
              timeStamp: "test time",
              caption: caption,
              imageUrl: url,
              userName: userName,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };
  return (
    <div>
      <progress value={progress} max="100" />
      <input
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Enter a caption..."
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>upload</Button>
    </div>
  );
}

export default ImageUpload;
