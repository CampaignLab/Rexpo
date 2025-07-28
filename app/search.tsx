"use client";

import { AutoComplete } from "@/components/autocomplete";
import Image from "next/image";
import { useMemo, useState } from "react";
import dataSource from "../data/bluesky.json";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SelectPills } from "@/components/currency-select";

export default function Search() {
  const [area, setArea] = useState<string>([]);
  const [people, setPeople] = useState<string>([]);

  const [selectedValue, setSelectedValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [selectedPeople, setSelectedPeople] = useState("");
  const [searchPeople, setSearchPeople] = useState("");

  console.log("dataSource", dataSource);

  const areas = useMemo(
    () =>
      Array.from(
        dataSource.reduce(
          (acc, curr) => new Set([...acc, ...curr.all_locations]),
          new Set(),
        ),
      )
        .sort()
        .map((item) => ({ name: item, value: item })),
    [],
  );

  const peopleList = useMemo(
    () =>
      Array.from(
        dataSource.reduce(
          (acc, curr) =>
            new Set([...acc, ...curr.all_persons.map((item) => item.name)]),
          new Set(),
        ),
      )
        .sort()
        .map((item) => ({ name: item, value: item })),
    [],
  );

  const data = useMemo(
    () =>
      dataSource
        .filter((item) => {
          if (people.length === 0 && area.length === 0) return true;
          if (
            people.length > 0 &&
            !item.all_persons.some((item) => people.includes(item.name))
          )
            return false;
          if (
            area.length > 0 &&
            !item.all_locations.some((item) => area.includes(item))
          )
            return false;
          return true;
        })
        .slice(0, 50),
    [people, area],
  );

  console.log(searchValue, searchPeople);

  return (
    <>
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative max-w-4xl mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            {/* Main title */}
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                Reform UK Exposed
              </h1>
            </div>

            {/* Description */}
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
                Are you a local campaigner looking for information about your
                local Reform candidates? These are tweets from the brilliant{" "}
                <span className="font-semibold text-white">
                  Reform UK Exposed
                </span>{" "}
                Twitter account, organised by geography and candidate.
              </p>
            </div>

            {/* Decorative elements */}
            <div className="flex justify-center pt-8">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-12 fill-gray-50"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
            ></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto max-w-xl flex flex-col gap-4 mt-10">
        <SelectPills
          data={areas}
          value={area}
          onValueChange={setArea}
          placeholder="Search areas"
        />
        <SelectPills
          data={peopleList}
          value={people}
          onValueChange={setPeople}
          placeholder="Search people"
        />

        {data.map((item, key) => (
          <Card
            key={key}
            className="hover:shadow-md transition-shadow duration-200"
          >
            <CardContent>
              <div className="space-y-3">
                {/* Tweet Content */}
                <p className="text-gray-800 leading-relaxed text-sm">
                  {item.text}
                </p>

                {/* Date and URL Row */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {new Date(item.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <Link
                    href={item.bluesky_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span>View original</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                {/* Related Areas */}
                <div className="space-y-2">
                  <div>
                    <span className="text-xs font-medium text-gray-700 mb-1 block">
                      Areas:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {item.all_locations.map((area, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 hover:bg-blue-200"
                        >
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Related People */}
                  <div>
                    <span className="text-xs font-medium text-gray-700 mb-1 block">
                      People:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {item.all_persons.map((person, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs px-2 py-0.5 border-green-200 text-green-800 hover:bg-green-50"
                        >
                          {person.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
