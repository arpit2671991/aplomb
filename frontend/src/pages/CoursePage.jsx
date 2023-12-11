import {useState} from 'react'

const CoursePage = () => {

    const [course, setCourse] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
  return (
    <div>CoursePage</div>
  )
}

export default CoursePage