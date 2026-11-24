/* Calcula o relevo, a sombra rasante e os pivôs fora da thread principal,
 * para a página continuar respondendo enquanto a cena se prepara. */
import { gerarCampo, escolherPivos } from "@/lib/terreno";

type Pedido = { segmentos: number; sol: [number, number, number]; passos: number };

self.onmessage = (e: MessageEvent<Pedido>) => {
  const { segmentos, sol, passos } = e.data;
  const campo = gerarCampo(segmentos, sol, passos);
  const pivos = escolherPivos(3);
  (self as unknown as Worker).postMessage({ campo, pivos }, [
    campo.alturas.buffer,
    campo.sombra.buffer,
    campo.oclusao.buffer,
  ]);
};
