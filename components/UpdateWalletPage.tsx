"use client";

import React, { useEffect } from 'react';
import { usePrivy } from "@privy-io/react-auth";
import { useAccount } from "wagmi";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

const UpdateWalletPage = () => {
  const { address } = useAccount();
  const { connectWallet } = usePrivy();
  const searchParams = useSearchParams();

  const { data, mutate } = useSWR<{
    discord_id: string;
    address: string;
    last_played: number;
    team: string;
  }>(
    address
      ? "/api/user?" +
          new URLSearchParams({
            address,
          })
      : null,
    fetcher,
  );

  useEffect(() => {
    if (
      data &&
      searchParams.get("token") &&
      searchParams.get("discord") &&
      address
    ) {
      fetch("/api/update-wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: searchParams.get("token"),
          discord: searchParams.get("discord"),
          address,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to update wallet');
          }
          return response.json();
        })
        .then(() => {
          mutate();
          toast.success("Successfully updated wallet address.");
        })
        .catch((err) => {
          toast.error("Failed to update wallet address.");
        });
    }
  }, [address, data, searchParams]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#275933]">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Update Wallet</h2>
          <p className="mt-2 text-sm text-gray-600">
            Connect your wallet to update your address
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {!address ? (
            <div className="group relative flex w-full justify-center">
              <button
                onClick={() => connectWallet()}
                className="flex w-full justify-center rounded-md bg-[#F74E2D] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#F74E2D]/90 focus-visible:outline focus-visible:outline-2"
              >
                Connect Wallet
              </button>
            </div>
          ) : (
            <div className="rounded-md bg-gray-50 p-4">
              <div className="flex">
                <div className="ml-3 flex-1 md:flex md:justify-between">
                  <p className="text-sm text-gray-700">
                    Connected with address: {address}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateWalletPage;