import './Content.css'

const Content = ({ sidebar }) => {
  return (
   <>
      <div className="content" style={!sidebar ? { width: "100vw", left: "0%" } : null }>Content</div>   
   </>
  )
}

export default Content

