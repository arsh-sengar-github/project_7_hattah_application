"use client";
import { zSchema } from "@/lib/zodSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@/hooks/use-fetch";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toastify } from "@/lib/toastify";
import BreadCrumb from "@/components/custom/user/breadCrumb";
import PanelLayout from "@/components/custom/user/panelLayout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Dropzone from "react-dropzone";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import User from "@/public/assets/icons/user.png";
import { FaCameraRetro } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ButtonLoading from "@/components/custom/buttonLoading";
import { login } from "@/store/reducer/authReducer";

const breadCrumb = {
  title: "Profile",
  links: [
    {
      label: "Profile",
    },
  ],
};
const ProfilePage = () => {
  const formSchema = zSchema.pick({
    fullName: true,
    phoneNumber: true,
    address: true,
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      address: "",
    },
  });
  const { data: userData } = useFetch("/api/profile/get");
  const [preview, setPreview] = useState();
  useEffect(() => {
    if (userData && userData.success) {
      const currUserData = userData.data;
      setPreview(currUserData?.avatar?.url);
      form.reset({
        fullName: currUserData?.fullName,
        phoneNumber: currUserData?.phoneNumber,
        address: currUserData?.address,
      });
    }
  }, [userData]);
  const [file, setFile] = useState();
  const onAvatarSubmit = (files) => {
    const file = files[0];
    setFile(file);
    const preview = URL.createObjectURL(file);
    setPreview(preview);
  };
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onProfileFormSubmit = async (values) => {
    setLoading(true);
    try {
      let formData = new FormData();
      if (file) {
        formData.set("file", file);
      }
      formData.set("fullName", values.fullName);
      formData.set("phoneNumber", values.phoneNumber);
      formData.set("address", values.address);
      const { data: profileData } = await axios.put(
        "/api/profile/set",
        formData
      );
      if (!profileData.success) {
        throw new Error(profileData.message);
      }
      dispatch(login(profileData.data));
      toastify("success", profileData.message);
    } catch (error) {
      toastify("error", error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <BreadCrumb props={breadCrumb} />
      <PanelLayout>
        <div className="shadow rounded">
          <div className="border-b p-4">
            <h1 className="text-xl font-semibold">Profile</h1>
          </div>
          <div className="p-4">
            <Form {...form}>
              <form
                className="grid md:grid-cols-2 grid-cols-1 gap-4"
                onSubmit={form.handleSubmit(onProfileFormSubmit)}
              >
                <div className="my-2 md:col-span-2 flex justify-center items-center">
                  <Dropzone
                    onDrop={(acceptedFiles) => onAvatarSubmit(acceptedFiles)}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Avatar className="relative border border-gray-500 w-32 h-32 group">
                          <AvatarImage src={preview ? preview : User.src} />
                          <div className="absolute left-1/2 top-1/2 z-1 border border-orange-500 rounded-full w-full h-full justify-center items-center bg-black/25 -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover:flex hidden">
                            <FaCameraRetro color="#E27C20" size={25} />
                          </div>
                        </Avatar>
                      </div>
                    )}
                  </Dropzone>
                </div>
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="First Middle Last Names"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="+XX-XXX-XXX-XXXX"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="my-2 md:col-span-2">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="House..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="my-2 md:col-span-2 col-span-1 flex justify-center items-center">
                  <ButtonLoading
                    className="cursor-pointer"
                    text="Save"
                    loading={loading}
                    type="submit"
                  />
                </div>
              </form>
            </Form>
          </div>
        </div>
      </PanelLayout>
    </div>
  );
};

export default ProfilePage;
