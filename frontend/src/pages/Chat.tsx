import { Button } from "@components/button";
import { Field, FieldContent } from "@components/field";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
 
const API_URL = import.meta.env.VITE_DJANGO_API_URL

function Chat() {
    const navigate = useNavigate()
    const [conversation, setConversation] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)
    const [sending, setSending] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
          try {
            const response = await fetch(`${API_URL}/check-auth/`, {
              credentials: 'include'
            })
            const data = await response.json()
            
            if (data.authenticated) {
              setAuthenticated(true)
            } else {
              navigate('/login')
            }
          } catch (error) {
            console.error('Auth check error:', error)
            navigate('/login')
          } finally {
            setLoading(false)
          }
        }
    
        checkAuth()
    }, [])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = e.currentTarget
        const messageInput = form.message as HTMLTextAreaElement
        const message = messageInput.value.trim()

        if(!message || sending) return

        // messageInput.value = ''

        const userMessage = {
            role: 'user',
            message: message
        }
        setConversation(prev => [...prev, userMessage])
        setSending(true)

        try {
            const response = await fetch(`${API_URL}/chat/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            })

            const data = await response.json()
            console.log(data)

            if(response.ok) {
                const botMessage = { role: 'bot', message: data.response }
                setConversation(prev => [...prev, botMessage])
            } else {
                setConversation(prev => prev.slice(0, -1))
                alert(data.error || 'Ocorreu um erro ao enviar a mensagem')
                throw new Error(data.error)
            }
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error)
        } finally {
            setSending(false)
        }
    }

    if (loading) {
        return <div className="p-8">Carregando...</div>
    }  

    return (
        <main className="max-w-4xl mx-auto min-h-full flex flex-col items-center justify-between pb-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-indigo-500">Chatbot de Atendimento da 4Blue</h1>
            </div>
            <section className="w-full max-w-4xl mx-auto space-y-4">
                <div className="space-y-4">
                    {conversation.length === 0 ? (
                        <p className="text-gray-400">Nenhuma conversa ainda.</p>
                    ) : (
                        conversation.map((msg, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg ${
                            msg.role === 'user'
                                ? 'bg-blue-100 ml-auto mr-0 max-w-md'
                                : 'bg-gray-100 mr-auto ml-0 max-w-md'
                            }`}
                        >
                                <p className="font-semibold text-sm mb-1">
                                {msg.role === 'user' ? 'Você' : 'Bot'}
                                </p>
                                <p>{msg.message}</p>
                        </div>
                        ))
                    )}
                </div>
            </section>
            <div className="sticky bottom-0 pt-4 bg-white dark:bg-black w-full">
                <form className="relative" onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
                    <Field>
                        <FieldContent>
                            <div className="relative flex items-end gap-2">
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="Gere um plano de aula para..."
                                rows={1}
                                className="resize-none overflow-hidden py-1.5 pr-12"
                                style={{
                                height: "fit-content",
                                minHeight: "52px",
                                maxHeight: "300px",
                                }}
                            />
                            <Button
                                type="submit"
                                size="sm"
                                className="absolute z-10 bottom-2 right-2 h-8 w-8 p-0 rounded-full"
                            >
                                <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="text-white"
                                >
                                <path
                                    d="M.5 1.163A1 1 0 011.97.28l12.868 6.837a1 1 0 010 1.766L1.969 15.72A1 1 0 01.5 14.836V10.33a1 1 0 01.816-.983L8.5 8 1.316 6.653A1 1 0 01.5 5.67V1.163z"
                                    fill="currentColor"
                                />
                                </svg>
                            </Button>
                            </div>
                        </FieldContent>
                    </Field>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                    Suporte da 4blue, entre e contato com a nossa equipe e te ajudaremos.
                </p>
                </div>
        </main>
    )
}

export default Chat