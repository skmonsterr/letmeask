import { database, ref, push, remove, update } from '../../services/firebase'
import { useParams, useNavigate } from 'react-router-dom'
import { useRoom } from '../../hooks/useRoom'
import logoImg from '../../assets/logo.svg'
import checkImg from '../../assets/check.svg'
import answerImg from '../../assets/answer.svg'
import deleteImg from '../../assets/delete.svg'
import { Button } from '../../components/Button'
import { RoomCode } from '../../components/RoomCode'
import { Question } from '../../components/Question'
import '../AdminRoom/styles.scss'

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  //const { user } = useAuth();
  const navigateTo = useNavigate();
  const params = useParams<RoomParams>();
  const roomId = String(params.id);
  const { questions, title } = useRoom(roomId);


  /* 
  FIXME: this should use React Modal
  TODO: Change confirm js message to react modal - https://github.com/reactjs/react-modal and use react hot toast https://react-hot-toast.com/
  */
  async function handleEndRoom() {
    if (confirm('Tem certeza que deseja excluir esta sala?')) {
      await update(ref(database, `rooms/${roomId}`), {
        endedAt: new Date(),
      })
      navigateTo('/')
    }
    return;
  }


  /* 
  FIXME: this should use React Modal
  TODO: Change confirm js message to react modal - https://github.com/reactjs/react-modal and use react hot toast https://react-hot-toast.com/
  */
  async function handleDeleteQuestion(questionId: string) {
    if (confirm('Tem certeza que deseja excluir esta pergunta?')) {
      await remove(ref(database, `rooms/${roomId}/questions/${questionId}`));

    }
  }

  /* 
    FIXME: this should use React Modal
    TODO: Change confirm js message to react modal - https://github.com/reactjs/react-modal and use react hot toast https://react-hot-toast.com/
    */
  async function handleCheckQuestionAsAnswered(questionId: string) {
    if (confirm('Tem certeza que deseja marcar pergunta como respondida?')) {
      await update(ref(database, `rooms/${roomId}/questions/${questionId}`), {
        isAnswered: true,
      });
    }

  }

  async function handleHighlightQuestion(questionId: string) {
    await update(ref(database, `rooms/${roomId}/questions/${questionId}`), {
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button
              isOutlined
              onClick={handleEndRoom}
            >
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 &&
            <span>{questions.length} {questions.length > 1 ? 'perguntas' : 'pergunta'}</span>
          }
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type='button'
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>
                    <button
                      type='button'
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque à pergunta" />
                    </button>
                  </>
                )}
                <button
                  type='button'
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>

              </Question>
            )
          })}
        </div>
      </main>
    </div>
  );
}