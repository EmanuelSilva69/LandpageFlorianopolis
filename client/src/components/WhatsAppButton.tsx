import { MessageCircle } from "lucide-react";

/**
 * Componente de Botão Flutuante WhatsApp
 * 
 * Como usar:
 * 1. Substitua "SEU_NUMERO_AQUI" pelo número com 55 e DDD
 *    Ex: 5548999999999 (Brasil, Santa Catarina)
 * 
 * 2. A mensagem padrão é: "Olá! Vim através do site e gostaria de falar com um especialista."
 *    Você pode customizar se necessário alterando a prop 'message'
 */

interface WhatsAppButtonProps {
  /**
   * Número do WhatsApp com código de país
   * Exemplo: 5548999999999 (55 + DDD + número)
   */
  phoneNumber?: string;
  /**
   * Mensagem padrão que será enviada
   */
  message?: string;
  /**
   * Aria label para acessibilidade
   */
  ariaLabel?: string;
}

export default function WhatsAppButton({
  phoneNumber = "5548991926759",
  message = "Olá! Vim através do site e gostaria de falar com um especialista.",
  ariaLabel = "Abrir WhatsApp",
}: WhatsAppButtonProps) {
  // Codificar a mensagem para URL segura
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-110 active:scale-95"
      title="Falar com um especialista no WhatsApp"
    >
      <MessageCircle className="w-8 h-8" strokeWidth={1.5} />
    </a>
  );
}

/**
 * ESTILOS EXPLICADOS (Tailwind CSS):
 * 
 * fixed bottom-6 right-6          -> Posição fixa no canto inferior direito (24px de margem)
 * z-50                             -> Z-index para ficar por cima de outros elementos
 * flex items-center justify-center -> Centraliza o ícone
 * w-16 h-16                        -> Tamanho do botão (4rem x 4rem = 64x64px)
 * bg-green-500                     -> Cor verde WhatsApp (cor próxima a #25D366)
 * hover:bg-green-600               -> Escurece ao fazer hover
 * text-white                       -> Ícone branco
 * rounded-full                     -> Faz o botão redondo (border-radius: 50%)
 * shadow-lg hover:shadow-2xl       -> Sombra elegante
 * transition-all duration-300      -> Animação suave
 * hover:scale-110                  -> Aumenta 10% ao passar o mouse
 * active:scale-95                  -> Diminui 5% ao clicar
 */
