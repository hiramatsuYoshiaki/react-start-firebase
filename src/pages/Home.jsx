import React, { useEffect, useState } from 'react'
import { db } from '../firebase/index'

const Home = () => { 
    // const projectsRef = db.collection('tags')
    
    const [projects, setProjects] = useState([
        {id:"01",name:'project1'},
        {id:"02",name:'project2'},
        {id:"03",name:'project3'},
    ])

    const fetchProjects = (projects) => {
        console.log('fetch project');
        // projectsRef.orderBy('postDate', 'desc').get()
        //     .then(snapshots => {
        //         const postsAll = []
        //         snapshots.forEach((snapshot) => {
        //             const post = snapshot.data()
        //             postsAll.push(post)
        //         })
        //         // dispatch(fetchPostsAction(postsAll))
        //     }).catch((error) => {
        //         console.log(error)
        //         throw new Error(error)
        // })
    






        setProjects(projects)
    }
    useEffect(()=> {
        const projects = [
            {id:"01",name:'project1'},
            {id:"02",name:'project2'},
            {id:"03",name:'project3'},
        ]
        fetchProjects(projects)
    },[])
    return (
        <div style={{backgroundColor:"white"}}>
            home with firebase
            {projects.map(project=>(
                <div key={project.id}>
                    <span>{project.id}</span>
                    <span>{project.name}</span>
                </div>
                
            ))}
            
        </div>
    )
}

export default Home 
 