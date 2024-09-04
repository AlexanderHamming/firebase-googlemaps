import { useState, useRef, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { storage } from "../service/firebase";
import "../assets/ProfilePage.scss";
import userAvatar from "../assets/imgs/genericAvatar.jpg";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const schema = z
  .object({
    displayName: z.string().min(3),
    email: z.string().email(),
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6).optional().or(z.literal("")),
    confirmNewPassword: z.string().min(6).optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.newPassword || data.confirmNewPassword) {
        return data.newPassword === data.confirmNewPassword;
      }
      return true;
    },
    {
      message: "Passwords don't match",
      path: ["confirmNewPassword"],
    }
  );

type FormFields = z.infer<typeof schema>;

const ProfilePage = () => {
  const { currentUser } = useAuth();

  const [avatarUrl, setAvatarUrl] = useState<string>(currentUser?.photoURL ?? userAvatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (currentUser) {
      if (currentUser.email) {
        setValue("email", currentUser.email);
      }
      if (currentUser.displayName) {
        setValue("displayName", currentUser.displayName);
      }
      if (currentUser.photoURL) {
        setAvatarUrl(currentUser.photoURL);
      }
    }
  }, [currentUser, setValue]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (!currentUser) return;

    try {
      const credential = EmailAuthProvider.credential(currentUser.email!, data.currentPassword);
      await reauthenticateWithCredential(currentUser, credential);
      if (data.newPassword) {
        await updatePassword(currentUser, data.newPassword);
        toast.success("Password updated successfully");
      }

      await updateProfile(currentUser, { displayName: data.displayName });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please check your current password and try again.");
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
      }).catch((error) => {
        console.error("There was a problem while updating your profile.\n" + error);
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <form className="d-flex flex-column align-items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Image src={avatarUrl} id="userAvatar" roundedCircle onClick={handleImageClick} />
      <input id="fileInput" type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/gif,image/jpeg,image/png,image/webp" />

      <input {...register("displayName")} type="text" placeholder="Nickname" />
      {errors.displayName && <div className="">{errors.displayName.message}</div>}

      <input {...register("email")} type="text" placeholder="Email" />
      {errors.email && <div className="">{errors.email.message}</div>}

      <input {...register("currentPassword")} type="password" placeholder="Current password" />
      {errors.currentPassword && <div className="">{errors.currentPassword.message}</div>}

      <input {...register("newPassword")} type="password" placeholder="New password" className="mt-3" />
      {errors.newPassword && <div className="">{errors.newPassword.message}</div>}

      <input {...register("confirmNewPassword")} type="password" placeholder="Confirm new password" className="mb-3" />
      {errors.confirmNewPassword && <div className="">{errors.confirmNewPassword.message}</div>}

      <Button className="btn btn-primary" disabled={isSubmitting} id="profilePageButton" type="submit">
        {isSubmitting ? "Updating..." : "Update Profile"}
      </Button>
      {errors.root && <div>{errors.root.message}</div>}
    </form>
  );
};

export default ProfilePage;
