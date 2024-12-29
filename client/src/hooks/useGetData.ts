import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import useDebounce from "@/hooks/useDebounce.ts";

const useGetData = () => {
    const [page, setPage] = useState<number>(1)
    const [search, setSearch] = useState<string>('')
    const debouncedSearch = useDebounce<string>(search, 500)

    const { isPending, error, data } = useQuery({
        queryKey: ['chars', debouncedSearch, page],
        queryFn: () =>
            fetch(`https://rickandmortyapi.com/api/character?name=${debouncedSearch}&page=${page}`).then((res) =>
                res.json(),
            ),
    })

    const nextPage = () => {
        if (data?.info.pages !== page) {
            setPage(page + 1)
        }
    }

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    return {page, debouncedSearch, isPending, error, data, nextPage, prevPage, searchHandler, search}
};

export default useGetData;