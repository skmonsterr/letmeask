import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { database, ref, get } from '../../services/firebase'

import illustrationImg from '../../assets/illustration.svg'
import logoImg from '../../assets/logo.svg'
import googleIconImg from '../../assets/google-icon.svg'
import { Button } from '../../components/Button'
import '../Home/styles.scss'

export function Home() {
  const navigateTo = useNavigate();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    navigateTo('/rooms/new');
  }


  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = get(ref(database, `rooms/${roomCode}`));

    /* 
FIXME: this should use React Hot Toast for errors
TODO: Change error message to react hot toast https://react-hot-toast.com/
*/
    if (!(await roomRef).exists()) {
      alert('Room does not exists.');
      return;
    }

    if ((await roomRef).val().endedAt) {
      alert('Room already ended.');
      return;
    }

    navigateTo(`rooms/${roomCode}`)
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
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}