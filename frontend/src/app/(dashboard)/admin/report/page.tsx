"use client";

import ReportTable from "./_components/report";
import SearchForm from "./_components/search_form";
import { useSearchParams } from "next/navigation";

export default function Report() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const type = searchParams.get("searchType") || "";

  console.log(query, type);

  return (
    <div className="py-10 w-[95%] mx-auto">
      <div>
        <SearchForm />
      </div>
      {!query && <ReportTable query={query} type={type} />}
    </div>
  );
}
