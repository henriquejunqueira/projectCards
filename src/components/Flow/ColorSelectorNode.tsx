import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

export default memo(({ data, isConnectable }) => {
  return (
    <>
      {/* PONTOS DO CARD PRINCIPAL */}
      <Handle
        type='target'
        position={Position.Left} // DEFINE A POSIÇÃO DOS PONTOS NO CARD PRINCIPAL
        style={{ background: '#557CF2', width: '12px', height: '12px' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable} // DEFINE A CONEXÃO INICIAL DOS PONTOS
      />
      {/* TÍTULO DO CARD PRINCIPAL */}
      <h6>Título da Anotação</h6>
      {/* CAMPO INPUT DO CARD PRINCIPAL */}
      <input
        className='nodrag form-control mb-2'
        type='text'
        style={{ background: '#fffafa', fontSize: '12px' }}
        placeholder='Digite o título da anotação'
      />
      {/* BOTÃO DO CARD PRINCIPAL */}
      <button className='btn btn-success'>Salvar</button>
      {/* PONTOS DO CARD PRINCIPAL */}
      <Handle
        type='source'
        position={Position.Top}
        id='a'
        style={{ top: 0, background: '#557CF2', width: '12px', height: '12px' }}
        isConnectable={isConnectable}
      />
      {/* PONTOS DO CARD PRINCIPAL */}
      <Handle
        type='source'
        position={Position.Right}
        id='b'
        style={{
          bottom: 10,
          top: 'auto',
          background: '#557CF2',
          width: '12px',
          height: '12px',
        }}
        isConnectable={isConnectable}
      />
    </>
  );
});
