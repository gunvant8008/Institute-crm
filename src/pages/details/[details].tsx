import { useRouter } from "next/router"
import React from "react"
import axios from "axios"
import { useQuery } from "react-query"
import Image from "next/image"
import Link from "next/link"

const fetchPhoto = (id: string | string[] | undefined) => {
  return axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`)
}

const Details = () => {
  const { query } = useRouter()
  const id = query.details

  const { isLoading, isError, data } = useQuery(["photo", id], () =>
    fetchPhoto(id)
  )
  if (isLoading) {
    return <h2>Loading...</h2>
  }
  if (isError) {
    return <h2>Something went wrong!</h2>
  }
  return (
    <div className="flex flex-col gap-y-10 p-8">
      <h2>Album Id- {data?.data.albumId}</h2>
      <h2>Title- {data?.data.title}</h2>
      <Image src={data?.data.url} width={400} height={400} alt="photo img" />
      <Link className="bg-teal-800 p-4 self-start" href="/list">
        Go Back
      </Link>
    </div>
  )
}

export default Details
