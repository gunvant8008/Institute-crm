import React from "react"
import { useQuery } from "react-query"
import axios from "axios"
import Link from "next/link"

const getPhotos = () => {
  return axios.get("https://jsonplaceholder.typicode.com/photos")
}

const List = () => {
  const { isLoading, isError, data } = useQuery("photos", getPhotos)

  if (isLoading) {
    return <h2>Loading...</h2>
  }
  if (isError) {
    return <h2>Something went wrong!</h2>
  }

  return (
    <div className="grid grid-cols-2 gap-8 max-w-xl p-8">
      {data?.data.map((item: any, index: any) => {
        if (index < 10) {
          return (
            <Link
              href={`/details/${item.id}`}
              key={item.id}
              className="bg-gray-800 p-4 flex flex-col space-y-2"
            >
              <h2>Album Id- {item.albumId}</h2>
              <h2>Id- {item.id}</h2>
              <h2>Album Title- {item.title}</h2>
            </Link>
          )
        }
      })}
    </div>
  )
}

export default List
