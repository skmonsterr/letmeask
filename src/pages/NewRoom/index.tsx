import { useAuth } from '../../hooks/useAuth'

import { Link, useNavigate } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import illustrationImg from '../../assets/illustration.svg'
import logoImg from '../../assets/logo.svg'
import { Button } from '../../components/Button'
import { database, push, ref } from '../../services/firebase'
import '../NewRoom/styles.scss'


export function NewRoom() {
  const { user } = useAuth();
  const navigateTo = useNavigate();
  const [newRoom, setNewRoom] = useState('');


  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = ref(database, 'rooms')
    const firebaseRoom = await push(roomRef, {
      title: newRoom,
      authorId: user?.id,
    })

    navigateTo(`/rooms/${firebaseRoom.key}`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A</strong>
        <p>Tire as suas dúvidas em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}