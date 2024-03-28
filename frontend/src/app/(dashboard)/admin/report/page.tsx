"use client";

import { useEffect, useState } from "react";
import ReportTable from "./_components/report";
import SearchForm from "./_components/search_form";
import { useSearchParams } from "next/navigation";

export default function Report() {
  const searchParams = useSearchParams();
  const queryParams = searchParams.get("query") || "";
  const typeParams = searchParams.get("searchType") || "";
  const pageNo = parseInt(searchParams.get("pageNo") || "1");
  const [query, setQuery] = useState(queryParams);
  const [type, setType] = useState(typeParams);
  return (
    <div className="py-10 w-[95%] mx-auto">
      <div>
        <SearchForm setQuery={setQuery} setType={setType} />
      </div>
      <ReportTable query={query} type={type} pageNo={pageNo} />
    </div>
  );
}
