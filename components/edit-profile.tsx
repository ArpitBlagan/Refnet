"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import {
  RiCloseLine,
  RiGithubFill,
  RiLinkedinBoxFill,
  RiLinkM,
  RiTwitterXFill,
  RiUserFill,
} from "@remixicon/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import Image from "next/image";
import { useRef, useState } from "react";
import { MediaFile } from "@/app/(playground)/upload/page";
import { updateProfile } from "@/actions/upload";
import { toast } from "sonner";

const EditProfile = () => {
  const [file, setFile] = useState<MediaFile | null>(null);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [github, setGithub] = useState("");
  const [resume, setResume] = useState("");
  const [twitter, setTwitter] = useState("");
  const [onOpen, setOnOpen] = useState(false);
  const fileInputRef = useRef(null);
  const handleMediaUpload = (e: any) => {
    if (e.target && e.target.files) {
      const file = e.target.files[0];
      setFile({
        file,
        preview: URL.createObjectURL(file),
        type: "image",
      });
    }
  };
  const handleRemoveMedia = () => {
    if (fileInputRef.current) {
      //@ts-ignore
      fileInputRef.current.value = null;
    }
    setFile(null);
  };
  const handleSubmit = async () => {
    let willUpdate = false;
    const formdata = new FormData();
    if (description) {
      formdata.append("description", description);
      willUpdate = true;
    }
    if (linkedIn) {
      formdata.append("linkedIn", linkedIn);
      willUpdate = true;
    }
    if (file) {
      formdata.append("file", file.file);
      willUpdate = true;
    }
    if (twitter) {
      formdata.append("twitter", twitter);
      willUpdate = true;
    }
    if (github) {
      formdata.append("github", twitter);
      willUpdate = true;
    }
    if (resume) {
      formdata.append("resume", resume);
      willUpdate = true;
    }
    if (!willUpdate) {
      setOnOpen(false);
      return;
    }
    toast.promise(
      async () => {
        setLoading(true);
        const res = await updateProfile(formdata);
        if (res.message) {
          return res;
        }
        throw new Error(res.error);
      },
      {
        loading: "Loading...",
        success: (res) => {
          setLoading(false);
          return `${res.message}`;
        },
        error: (error) => {
          setLoading(false);
          return `${error}`;
        },
      }
    );
  };
  return (
    <Dialog open={onOpen} onOpenChange={setOnOpen}>
      <DialogTrigger asChild>
        <Button className="border border-white rounded-xl py-2 px-4 font-semibold hover:bg-green-600">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black h-[95vh] overflow-hidden overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-3 py-3 border-b border-white">
            <div className="p-4 border rounded-full flex items-center gap-4">
              <RiUserFill />
              <span>Edit profile</span>
            </div>
          </DialogTitle>
          <DialogDescription>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-white">
                  New profile image
                </label>
                {/* <div className="h-[25vh]"></div> */}
                <Input
                  type="file"
                  className="text-white bg-gray-800"
                  ref={fileInputRef}
                  onChange={handleMediaUpload}
                  accept="image/*"
                />
                {file && (
                  <div className="flex items-center jutify-center relative">
                    <img
                      src={file.preview}
                      alt={`Uploaded media`}
                      className="w-full h-40 object-cover rounded"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1"
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveMedia();
                      }}
                    >
                      <RiCloseLine className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-white">
                  About you and your background
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  className="h-[100px] text-white py-2"
                  placeholder="Hey, I am Arpit Blagan @23 CS undergraduate and I am into full stack development."
                />
                <p className="text-sm text-muted-foreground">
                  Write it within 300 words
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-white">
                  <RiLinkedinBoxFill />
                </label>
                <Input
                  value={linkedIn}
                  onChange={(e) => {
                    setLinkedIn(e.target.value);
                  }}
                  className="text-white py-2"
                  placeholder="Your linkedin link"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-white">
                  <RiTwitterXFill />
                </label>
                <Input
                  value={twitter}
                  onChange={(e) => {
                    setTwitter(e.target.value);
                  }}
                  className="text-white py-2"
                  placeholder="Your twitter link"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-white">
                  <RiGithubFill />
                </label>
                <Input
                  value={github}
                  onChange={(e) => {
                    setGithub(e.target.value);
                  }}
                  className="text-white py-2"
                  placeholder="Your github link"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="flex items-center text-white font-semibold">
                  <RiLinkM /> Resume
                </label>
                <Input
                  value={resume}
                  onChange={(e) => {
                    setResume(e.target.value);
                  }}
                  className="text-white py-2"
                  placeholder="Your resume link"
                />
              </div>
              <div className="flex items-center gap-3 justify-end pt-4 border-t boder-white">
                <Button className="font-bold hover:bg-white hover:text-black">
                  Cancle
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 font-bold hover:bg-green-800"
                >
                  Update
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
