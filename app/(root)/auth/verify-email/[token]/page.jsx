"use client";
import { use, useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Verified from "@/public/assets/icons/verified.gif";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { USER_HOME } from "@/routes/UserRoute";
import NotVerified from "@/public/assets/icons/not-verified.gif";

const VerifyEmail = ({ params }) => {
  const { token } = use(params);
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    const verify = async () => {
      const { data: verificationResponse } = await axios.post(
        "/api/auth/verify-email",
        { token }
      );
      if (verificationResponse.success) {
        setIsVerified(true);
      }
    };
    verify();
  }, [token]);
  return (
    <div>
      <Card className="w-[400px]">
        <CardContent>
          {isVerified ? (
            <div>
              <div className="flex justify-center items-center">
                <Image
                  src={Verified.src}
                  alt="verified"
                  width={Verified.width}
                  height={Verified.height}
                />
              </div>
              <div className="text-center">
                <h1 className="my-4 text-2xl text-green-500 font-bold">
                  Verified
                </h1>
                <Button asChild>
                  <Link href={USER_HOME}>Continue to Hattah</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-center items-center">
                <Image
                  src={NotVerified.src}
                  alt="unverified"
                  width={NotVerified.width}
                  height={NotVerified.height}
                />
              </div>
              <div className="text-center">
                <h1 className="my-4 text-2xl text-red-500 font-bold">
                  Unverified
                </h1>
                <Button asChild>
                  <Link href={USER_HOME}>Continue to Hattah</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
