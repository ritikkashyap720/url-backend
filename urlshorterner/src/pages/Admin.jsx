import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

function Admin() {
  const navigate = useNavigate()
  const [allurl, setAllUrl] = useState(null)
  const [newUrl, setNewUrl] = useState("")
  const [token, setToken] = useState(localStorage.getItem("token") || "")
  useEffect(() => {
    if (token) {
      LoadAllUrl(token)
    } else {
      navigate("/login")
    }
  }, [])

  async function handleAdd() {
    if (newUrl) {
      console.log(token)
      const response = await axios.post("http://localhost:8000/url/newurl", { mainUrl: newUrl },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        })
      if (response.data.msg == "success") {
        LoadAllUrl(token)
      }
    }
  }

  async function LoadAllUrl(token) {
    if (token) {
      const response = await axios.get("http://localhost:8000/url/allurl", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.data.msg == "invalid authtoken") {
        navigate("/login")
        localStorage.clear()
      } else {
        setAllUrl(response.data)
      }
      console.log(response)
    }
  }

  async function deleteURL(urlID) {
    console.log(token)
    const response = await axios.delete("http://localhost:8000/url/deleteUrl",
      {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      },
      { urlID: urlID },)
    if (response.data.msg == "success") {
      LoadAllUrl(token)
    }
    console.log(response)
  }



  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Panel – URL Shortener</h1>
      <div className="flex gap-2 mb-6">
        <input
          placeholder="Original URL"
          value={newUrl}
          onChange={e => setNewUrl(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      {allurl && <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Short Code</th>
            <th className="p-2">Original URL</th>
            <th className="p-2">Clicks</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allurl.map(url => (
            <tr key={url._id} className="border-t">
              <td className="p-2">{url.shortID}</td>
              <td className="p-2 break-all">{url.mainUrl}</td>
              <td className="p-2">{url.clicks}</td>
              <td className="p-2">
                <button
                  onClick={(url) => { deleteURL(url._id) }}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>}

    </div>
  )
}

export default Admin

