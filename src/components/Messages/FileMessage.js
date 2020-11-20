import React from 'react';

const FileMessage = (props) => {
  const meta = props.message.data.meta || null
  const text = props.message.data.text || ''
  const file = props.message.data.file
  const author = props.message.author
  return (
    <div className='sc-message--file' >
      {
        props.message && 
        author === "me" && 
        props.onDelete && 
          <button className='delete-message' onClick={() => props.onDelete(props.message)}>
            x
          </button>
      }
      <div className='sc-message--file-icon'>
        <a href={file.url || '#'} target='_blank'>
          <img src="https://hellocashback.me/themes/hellocashbackua/assets/img/chat/file.svg" alt='generic file icon' height={60} />
        </a>
      </div>
      <div className='sc-message--file-name'>
        <a href={file.url ? file.url : '#'} target='_blank'>{file.name}</a>
      </div>
      <div className='sc-message--file-text' >
        {text}
      </div>
      {meta && <p className='sc-message--meta'>{meta}</p>}
    </div>
  )
}

export default FileMessage