import { useState, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { storage } from "../service/firebase";
import "../assets/ProfilePage.scss";
import userAvatar from "../assets/imgs/genericAvatar.jpg";
import useAuth from "../hooks/useAuth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormFields = z.infer<typeof schema>;

const ProfilePage = () => {
  const { currentUser } = useAuth();

  const [avatarUrl, setAvatarUrl] = useState<string>(currentUser?.photoURL ?? userAvatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((r) => setTimeout(r, 1000));
      console.log(data);
    } catch (error) {
      setError("root", {
        message: "This email is already taken",
      });
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      if (!currentUser) return;

      const storageRef = ref(storage, `avatars/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setAvatarUrl(downloadURL);
      console.log(downloadURL);

      updateProfile(currentUser, {
        photoURL: downloadURL,
      }).catch((_error) => {
        // An error occurred
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <form className="d-flex flex-column align-items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Image src={avatarUrl} id="userAvatar" roundedCircle onClick={handleImageClick} />
      <input id="fileInput" type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/gif,image/jpeg,image/png,image/webp" />
      <input {...register("email")} type="text" placeholder="Email" />
      {errors.email && <div className="">{errors.email.message}</div>}
      <input {...register("password")} type="password" placeholder="Password" />
      {errors.password && <div className="">{errors.password.message}</div>}
      <Button className="btn btn-primary" disabled={isSubmitting} id="profilePageButton" type="submit">
        {isSubmitting ? "Loading..." : "Submit"}
      </Button>
      {errors.root && <div>{errors.root.message}</div>}
    </form>
  );
};

export default ProfilePage;
