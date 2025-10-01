import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import searchData from "@/lib/search";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const options = {
  keys: ["label", "description", "keywords"],
  threshold: 0.3,
};
const SearchModal = ({ open, setOpen }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const fuse = new Fuse(searchData, options);
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
    }
    const response = fuse.search(query);
    setResults(response.map(({ item }) => item));
  }, [query]);
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>Search for anything...</DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Search..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoFocus
        />
        <ul className="overflow-y-auto my-2 max-h-50">
          {results.map((item, index) => (
            <li key={index}>
              <Link
                className="block rounded px-4 py-2 hover:bg-muted"
                href={item.url}
                onClick={() => setOpen(false)}
              >
                <h2 className="font-medium">{item.label}</h2>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </Link>
            </li>
          ))}
          {query && results.length === 0 && (
            <li className="p-2 text-center text-sm text-red-500">
              Nothing found.
            </li>
          )}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
