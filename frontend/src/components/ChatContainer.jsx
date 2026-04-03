import React from 'react'
import { useChatStore } from '../store/useChatStore'

const ChatContainer = () => {
  const {selectedUser} = useChatStore()
  return (
    <div>{selectedUser?.userName}</div>
  )
}

export default ChatContainer