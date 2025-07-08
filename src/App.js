import React, { useState, useMemo, useCallback } from 'react';


// =======================================================================
// Componentes da Aplicação de Proposta (Mantidos como antes)
// =======================================================================

// Componente para a aba de Parâmetros
const ParametersTab = React.memo(({
    clientName, setClientName,
    contractName, setContractName,
    contractMonths, setContractMonths,
    tools, handleToolChange, handleAddTool, handleRemoveTool,
    professionals, handleProfessionalChange, handleAddProfessional, handleRemoveProfessional
}) => (
    <div className="p-6 bg-white rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-[1.005]">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Parâmetros do Projeto</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="relative">
                <label htmlFor="clientName" className="block text-sm font-semibold text-gray-700 mb-2">Cliente</label>
                <input
                    type="text"
                    id="clientName"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
                    value={clientName}
                    onChange={(e) => {
                        console.log('Client Name Input:', e.target.value);
                        setClientName(e.target.value);
                    }}
                    placeholder="Nome do Cliente"
                />
            </div>
            <div className="relative">
                <label htmlFor="contractName" className="block text-sm font-semibold text-gray-700 mb-2">Contrato</label>
                <input
                    type="text"
                    id="contractName"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
                    value={contractName}
                    onChange={(e) => {
                        console.log('Contract Name Input:', e.target.value);
                        setContractName(e.target.value);
                    }}
                    placeholder="Nome do Contrato/Projeto"
                />
            </div>
            <div className="md:col-span-2 relative">
                <label htmlFor="contractMonths" className="block text-sm font-semibold text-gray-700 mb-2">Meses de Contrato</label>
                <input
                    type="number"
                    id="contractMonths"
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-400"
                    value={contractMonths}
                    // Garante que o valor seja sempre um número inteiro e no mínimo 1
                    onChange={(e) => setContractMonths(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    min="1"
                />
            </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 border-gray-200">Gerenciar Ferramentas</h3>
        <div className="space-y-5 mb-10">
            {tools.map(tool => (
                <div key={tool.id} className="flex flex-col md:flex-row items-center gap-4 p-5 border border-gray-200 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <label htmlFor={`tool-name-${tool.id}`} className="sr-only">Nome da Ferramenta</label>
                    <input
                        type="text"
                        id={`tool-name-${tool.id}`}
                        className="flex-grow p-3 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-gray-800"
                        placeholder="Nome da Ferramenta"
                        value={tool.name}
                        onChange={(e) => handleToolChange(tool.id, 'name', e.target.value)}
                    />
                    <label htmlFor={`tool-cost-${tool.id}`} className="sr-only">Custo Mensal</label>
                    <input
                        type="number"
                        id={`tool-cost-${tool.id}`}
                        className="w-full md:w-36 p-3 border border-gray-300 rounded-md text-center focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-gray-800"
                        placeholder="Custo Mensal"
                        value={tool.monthlyCost}
                        onChange={(e) => handleToolChange(tool.id, 'monthlyCost', e.target.value)}
                        min="0"
                    />
                    <button
                        onClick={() => handleRemoveTool(tool.id)}
                        className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-md hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
                    >
                        Remover
                    </button>
                </div>
            ))}
            <button
                onClick={handleAddTool}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 active:scale-95 text-lg font-semibold"
            >
                Adicionar Ferramenta
            </button>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 border-gray-200">Gerenciar Profissionais</h3>
        <div className="space-y-5">
            {professionals.map(prof => (
                <div key={prof.id} className="flex flex-col md:flex-row items-center gap-4 p-5 border border-gray-200 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <label htmlFor={`prof-name-${prof.id}`} className="sr-only">Nome do Profissional</label>
                    <input
                        type="text"
                        id={`prof-name-${prof.id}`}
                        className="flex-grow p-3 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-gray-800"
                        placeholder="Nome do Profissional"
                        value={prof.name}
                        onChange={(e) => handleProfessionalChange(prof.id, 'name', e.target.value)}
                    />
                    <label htmlFor={`prof-role-${prof.id}`} className="sr-only">Cargo</label>
                    <input
                        type="text"
                        id={`prof-role-${prof.id}`}
                        className="flex-grow p-3 border border-gray-300 rounded-md focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-gray-800"
                        placeholder="Cargo"
                        value={prof.role}
                        onChange={(e) => handleProfessionalChange(prof.id, 'role', e.target.value)}
                    />
                    <label htmlFor={`prof-fee-${prof.id}`} className="block text-sm font-semibold text-gray-700 sr-only">Fee Mensal</label>
                    <input
                        type="number"
                        id={`prof-fee-${prof.id}`}
                        className="w-full md:w-36 p-3 border border-gray-300 rounded-md text-center focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-gray-800"
                        placeholder="Fee Mensal"
                        value={prof.monthlyFee}
                        onChange={(e) => handleProfessionalChange(prof.id, 'monthlyFee', e.target.value)}
                        min="0"
                    />
                    <button
                        onClick={() => handleRemoveProfessional(prof.id)}
                        className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-md hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
                    >
                        Remover
                    </button>
                </div>
            ))}
            <button
                onClick={handleAddProfessional}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 active:scale-95 text-lg font-semibold"
            >
                Adicionar Profissional
            </button>
        </div>
    </div>
));

// Componente para a aba de Pedidos
const OrdersTab = React.memo(({ services, selectedServices, handleServiceUpdate, availableTools }) => {
    // Função auxiliar para renderizar a seleção de ferramentas
    const renderToolSelection = (serviceId, currentSelectedTools) => (
        <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">Ferramentas para este serviço:</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {availableTools.map(tool => (
                    <div key={tool.id} className="flex items-center">
                        <input
                            type="checkbox"
                            id={`tool-${serviceId}-${tool.id}`}
                            checked={currentSelectedTools.includes(tool.name)}
                            onChange={(e) => {
                                const newSelectedTools = e.target.checked
                                    ? [...currentSelectedTools, tool.name]
                                    : currentSelectedTools.filter(name => name !== tool.name);
                                handleServiceUpdate(serviceId, 'selectedTools', newSelectedTools);
                            }}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor={`tool-${serviceId}-${tool.id}`} className="ml-2 text-sm text-gray-700 cursor-pointer">
                            {tool.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="p-6 bg-white rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-[1.005]">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Pedidos de Serviço</h2>
            <div className="space-y-6">
                {services.map(service => {
                    // Inicializa selectedTools como um array vazio se não houver um valor prévio
                    const currentServiceSelection = selectedServices[service.id] || {
                        active: false,
                        quantity: 0,
                        customValue: service.pricingType === 'value' ? service.defaultValue : 0, // Inicializa customValue com defaultValue
                        selectedTools: []
                    };
                    return (
                        <div key={service.id} className={`flex flex-col md:flex-row items-start md:items-center gap-4 p-5 border rounded-lg shadow-sm transition-shadow duration-200 ${currentServiceSelection.active ? 'bg-blue-50 border-blue-200 hover:shadow-md' : 'bg-gray-50 border-gray-200 hover:shadow-md'}`}>
                            <div className="flex items-center mb-3 md:mb-0">
                                <input
                                    type="checkbox"
                                    id={`service-active-${service.id}`}
                                    checked={currentServiceSelection.active}
                                    onChange={(e) => {
                                        const isActive = e.target.checked;
                                        handleServiceUpdate(service.id, 'active', isActive);
                                        // Se desativar, zera quantidade/valor e ferramentas
                                        if (!isActive) {
                                            handleServiceUpdate(service.id, 'quantity', 0);
                                            handleServiceUpdate(service.id, 'customValue', 0);
                                            handleServiceUpdate(service.id, 'selectedTools', []); // Zera ferramentas selecionadas
                                        } else {
                                            // Se ativar, inicializa customValue com defaultValue se for tipo 'value'
                                            if (service.pricingType === 'value') {
                                                handleServiceUpdate(service.id, 'customValue', service.defaultValue || 0);
                                            }
                                            // Se ativar e for tipo 'quantity' e a quantidade for 0, define como 1
                                            if (service.pricingType === 'quantity' && currentServiceSelection.quantity === 0) {
                                                handleServiceUpdate(service.id, 'quantity', 1);
                                            }
                                        }
                                    }}
                                    className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                />
                                <label htmlFor={`service-active-${service.id}`} className="ml-3 text-xl font-bold text-gray-800 cursor-pointer">
                                    {service.name}
                                </label>
                            </div>

                            {currentServiceSelection.active && (
                                <div className="flex-grow w-full md:w-auto">
                                    {service.pricingType === 'quantity' ? (
                                        <div className="flex items-center gap-3 mt-2 md:mt-0">
                                            <label htmlFor={`qty-${service.id}`} className="text-base font-semibold text-gray-700 whitespace-nowrap">Quantidade:</label>
                                            <input
                                                type="number"
                                                id={`qty-${service.id}`}
                                                className="w-28 p-3 border border-gray-300 rounded-md text-center text-lg font-medium focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                value={currentServiceSelection.quantity}
                                                onChange={(e) => handleServiceUpdate(service.id, 'quantity', parseInt(e.target.value, 10) || 0)}
                                                min="0"
                                            />
                                            <span className="text-gray-600 font-medium ml-2">R$ {service.unitPrice.toFixed(2)} / unidade</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3 mt-2 md:mt-0">
                                            <label htmlFor={`value-${service.id}`} className="text-base font-semibold text-gray-700 whitespace-nowrap">Valor Fixo (R$):</label>
                                            <input
                                                type="number"
                                                id={`value-${service.id}`}
                                                className="w-36 p-3 border border-gray-300 rounded-md text-center text-lg font-medium focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                value={currentServiceSelection.customValue}
                                                onChange={(e) => handleServiceUpdate(service.id, 'customValue', parseFloat(e.target.value) || 0)}
                                                min="0"
                                            />
                                        </div>
                                    )}
                                    {/* Renderiza a seleção de ferramentas apenas se o serviço não tiver hideToolsSelection */}
                                    {!service.hideToolsSelection && renderToolSelection(service.id, currentServiceSelection.selectedTools)}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

// Componente para a aba de Resumo
const SummaryTab = React.memo(({ clientName, contractName, contractMonths, summary, services, selectedServices }) => {
    return (
        <div className="p-6 bg-white rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-[1.005]">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Resumo da Proposta: {clientName || 'Cliente'}</h2>

            <div className="mb-8 text-lg text-gray-700 bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200">
                <p className="mb-2"><strong className="text-gray-900">Cliente:</strong> {clientName || 'Não Definido'}</p>
                <p className="mb-2"><strong className="text-gray-900">Contrato:</strong> {contractName || 'Não Definido'}</p>
                {/* Correção da pluralização de "mês/meses" */}
                <p><strong className="text-gray-900">Duração do Contrato:</strong> {contractMonths} {contractMonths === 1 ? 'mês' : 'meses'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200">
                    <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                        <span className="mr-2 text-2xl">👨‍💻</span> Custos de Profissionais (Total p/ Contrato)
                    </h3>
                    <p className="text-gray-700 text-xl mb-3">Total: <span className="font-extrabold text-blue-900">R$ {summary.totalProfessionalExpenses.toFixed(2)}</span></p>
                    <ul className="mt-2 text-sm text-gray-600 list-disc list-inside space-y-1">
                        {/* Exibe o fee mensal por profissional */}
                        {Object.entries(summary.professionalExpensesBreakdown).map(([name, fee]) => (
                            <li key={name}>{name}: R$ {fee.toFixed(2)}/mês</li>
                        ))}
                        {Object.keys(summary.professionalExpensesBreakdown).length === 0 && <li>Nenhum profissional alocado.</li>}
                    </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-lg shadow-md border border-green-200">
                    <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                        <span className="mr-2 text-2xl">🛠️</span> Custos de Ferramentas (Total p/ Contrato)
                    </h3>
                    <p className="text-gray-700 text-xl mb-3">Total: <span className="font-extrabold text-green-900">R$ {summary.totalToolExpenses.toFixed(2)}</span></p>
                    <ul className="mt-2 text-sm text-gray-600 list-disc list-inside space-y-1">
                        {Object.keys(summary.toolExpensesBreakdown).map((toolName) => (
                            <li key={toolName}>{toolName} (<span className="font-medium">x{contractMonths} meses</span>)</li>
                        ))}
                        {Object.keys(summary.toolExpensesBreakdown).length === 0 && <li>Nenhuma ferramenta utilizada.</li>}
                    </ul>
                </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg shadow-lg mb-8 border border-yellow-300 text-center">
                <h3 className="text-2xl font-bold text-yellow-800 mb-4 flex items-center justify-center">
                    <span className="mr-2 text-3xl">💰</span> Valor dos Serviços Selecionados (Total)
                </h3>
                <p className="text-gray-800 text-3xl">Total: <span className="font-extrabold text-yellow-900">R$ {summary.totalServiceItemsValue.toFixed(2)}</span></p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-red-50 p-6 rounded-lg shadow-md border border-red-200">
                    <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                        <span className="mr-2 text-2xl">📉</span> Imposto de Renda (IR - 15%)
                    </h3>
                    <p className="text-gray-700 text-xl">Valor: <span className="font-extrabold text-red-900">R$ {summary.irAmount.toFixed(2)}</span></p>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg shadow-md border border-orange-200">
                    <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
                        <span className="mr-2 text-2xl">📊</span> Despesas Operacionais (10%)
                    </h3>
                    <p className="text-gray-700 text-xl">Valor: <span className="font-extrabold text-orange-900">R$ {summary.operationalExpensesAmount.toFixed(2)}</span></p>
                </div>
            </div>

            <div className="bg-purple-100 p-8 rounded-xl shadow-2xl text-center border-4 border-purple-300 transform hover:scale-105 transition-transform duration-300 mb-8">
                <h3 className="text-3xl font-extrabold text-purple-900 mb-4">Valor Total Final da Proposta</h3>
                <p className="text-5xl font-extrabold text-purple-900 animate-pulse">R$ {summary.finalProposalValue.toFixed(2)}</p>
                <p className="text-md text-gray-700 mt-4">Este valor inclui custos de serviços, profissionais, ferramentas, IR e despesas operacionais para a duração do contrato.</p>
            </div>

            {/* Novo bloco para o Valor Mensal Final */}
            <div className="bg-indigo-100 p-8 rounded-xl shadow-2xl text-center border-4 border-indigo-300 transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-3xl font-extrabold text-indigo-900 mb-4">Valor Mensal da Proposta</h3>
                <p className="text-5xl font-extrabold text-indigo-900 animate-pulse">R$ {summary.monthlyProposalValue.toFixed(2)}</p>
                <p className="text-md text-gray-700 mt-4">Este é o valor médio mensal para a duração total do contrato.</p>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-6 border-b pb-3 border-gray-200">Detalhes dos Serviços Incluídos</h3>
            <div className="space-y-4">
                {Object.entries(selectedServices).filter(([, details]) => details.active).length > 0 ? (
                    Object.entries(selectedServices).filter(([, details]) => details.active).map(([serviceId, details]) => {
                        const service = services.find(s => s.id === parseInt(serviceId));
                        if (service) {
                            return (
                                <div key={service.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-sm hover:shadow-md transition-shadow duration-200">
                                    <div>
                                        <p className="font-semibold text-lg text-gray-800">{service.name}</p>
                                        {service.pricingType === 'quantity' ? (
                                            <p className="text-sm text-gray-600">Quantidade: <span className="font-medium">{details.quantity}</span> (R$ {service.unitPrice.toFixed(2)}/unidade)</p>
                                        ) : (
                                            <p className="text-sm text-gray-600">Valor Fixo: <span className="font-medium">R$ {details.customValue.toFixed(2)}</span></p>
                                        )}
                                        {details.selectedTools && details.selectedTools.length > 0 && (
                                            <p className="text-sm text-gray-600 mt-1">
                                                Ferramentas:
                                                {details.selectedTools.map((toolName) => (
                                                    <span key={toolName} className="ml-2 bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full inline-flex items-center">
                                                        <span className="mr-1">🔧</span>{toolName}
                                                    </span>
                                                ))}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })
                ) : (
                    <p className="text-gray-600 text-center p-4 bg-gray-50 rounded-md border border-gray-200">Nenhum serviço selecionado.</p>
                )}
            </div>
        </div>
    );
});


// =======================================================================
// Componente Principal da Aplicação (Gerencia Login, Landing Page e App de Proposta)
// =======================================================================
const App = () => {
    // Estados para gerenciamento de autenticação e visualização
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [loginError, setLoginError] = useState('');
    const [showProposalApp, setShowProposalApp] = useState(false); // Controla a visibilidade do aplicativo de proposta

    // Credenciais de usuários
    const users = {
        dan: 'd',
        bruno: 'b',
        kleber: 'laura',
        julia: 'j',
    };

    // Função para lidar com o login
    const handleLogin = (username, password) => {
        if (users[username] === password) {
            setIsLoggedIn(true);
            setCurrentUser(username);
            setLoginError('');
        } else {
            setLoginError('Usuário ou senha inválidos.');
        }
    };

    // Função para lidar com o logout
    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
        setShowProposalApp(false); // Esconde o app de proposta ao deslogar
    };

    // Estados para os parâmetros do projeto (mantidos do app original)
    const [clientName, setClientName] = useState('');
    const [contractName, setContractName] = useState('');
    // Valor inicial de contractMonths é 1, e o input garante que seja sempre >= 1
    const [contractMonths, setContractMonths] = useState(1);
    const [tools, setTools] = useState([
        { id: 1, name: 'VEO 3', monthlyCost: 1500 },
        { id: 2, name: 'Heygen', monthlyCost: 158  },
        { id: 3, name: 'Canva Pro', monthlyCost: 15 },
        { id: 4, name: 'Kling', monthlyCost: 36 },
        { id: 5, name: 'Runway', monthlyCost: 190 },
        { id: 6, name: 'Midjourney', monthlyCost: 130 },
        { id: 7, name: 'Suno', monthlyCost: 44 },
        { id: 8, name: 'CapCut', monthlyCost: 39 },
    ]);
    const [professionals, setProfessionals] = useState([
        { id: 1, name: 'Dezão', role: 'Criação', monthlyFee: 0 },
        { id: 2, name: 'Felipe', role: 'Criação', monthlyFee: 0 },
        { id: 3, name: 'Anna Maria', role: 'Designer UX', monthlyFee: 0 },
        { id: 4, name: 'Zé Mané', role: 'Cinegrafista', monthlyFee: 0 },
        { id: 5, name: 'Kleber', role: 'Programador', monthlyFee: 0 },
        { id: 6, name: 'Zé Mané', role: 'Cinegrafista', monthlyFee: 0 },
    ]);

    // Estados para os serviços e suas quantidades/valores/ferramentas selecionadas (mantidos do app original)
    const [services] = useState([
        { id: 1, name: 'Filme Publicitário (IA)', pricingType: 'quantity', unitPrice: 10000 },
        { id: 2, name: 'Reels', pricingType: 'quantity', unitPrice: 281 },
        { id: 3, name: 'Estático (pacote mensal)', pricingType: 'quantity', unitPrice: 94 },
        { id: 4, name: 'Stories (2–3 slides)', pricingType: 'quantity', unitPrice: 188 },
        { id: 5, name: 'Jingle', pricingType: 'quantity', unitPrice: 3000 },
        { id: 6, name: 'Filme Institucional (IA)', pricingType: 'quantity', unitPrice: 10000 },
        { id: 7, name: 'Site completo', pricingType: 'value', defaultValue: 20000, hideToolsSelection: true },
        { id: 8, name: 'Mídia Programática (mensal)', pricingType: 'value', defaultValue: 2000, hideToolsSelection: true },
        { id: 9, name: 'Gestão de Mídias Sociais (mensal)', pricingType: 'value', defaultValue: 500, hideToolsSelection: true },
        { id: 10, name: 'Branding', pricingType: 'value', defaultValue: 15000, hideToolsSelection: true },
        { id: 11, name: 'Criação de App', pricingType: 'value', defaultValue: 20000, hideToolsSelection: true },
        { id: 12, name: 'Landing Page', pricingType: 'value', defaultValue: 2000 },
    ]);
    const [selectedServices, setSelectedServices] = useState({});

    // Estado para a aba atualmente visível ('parameters', 'orders', 'summary')
    const [currentView, setCurrentView] = useState('parameters');

    // Funções de manipulação de estado (mantidas do app original)
    const handleServiceUpdate = useCallback((serviceId, field, value) => {
        setSelectedServices(prev => {
            const currentDetails = prev[serviceId] || { active: false, quantity: 0, customValue: 0, selectedTools: [] };
            return {
                ...prev,
                [serviceId]: {
                    ...currentDetails,
                    [field]: value,
                },
            };
        });
    }, []);

    const handleAddTool = useCallback(() => {
        setTools(prevTools => {
            const newId = prevTools.length > 0 ? Math.max(...prevTools.map(t => t.id)) + 1 : 1;
            return [...prevTools, { id: newId, name: '', monthlyCost: 0 }];
        });
    }, []);

    const handleToolChange = useCallback((id, field, value) => {
        setTools(prevTools => prevTools.map(tool =>
            tool.id === id ? { ...tool, [field]: field === 'monthlyCost' ? parseFloat(value) || 0 : value } : tool
        ));
    }, []);

    const handleRemoveTool = useCallback((id) => {
        setTools(prevTools => prevTools.filter(tool => tool.id !== id));
    }, []);

    const handleAddProfessional = useCallback(() => {
        setProfessionals(prevProfessionals => {
            const newId = prevProfessionals.length > 0 ? Math.max(...prevProfessionals.map(p => p.id)) + 1 : 1;
            return [...prevProfessionals, { id: newId, name: '', role: '', monthlyFee: 0 }];
        });
    }, []);

    const handleProfessionalChange = useCallback((id, field, value) => {
        setProfessionals(prevProfessionals => prevProfessionals.map(prof =>
            prof.id === id ? { ...prof, [field]: field === 'monthlyFee' ? parseFloat(value) || 0 : value } : prof
        ));
    }, []);

    const handleRemoveProfessional = useCallback((id) => {
        setProfessionals(prevProfessionals => prevProfessionals.filter(prof => prof.id !== id));
    }, []);

    // Cálculo do resumo
    const summary = useMemo(() => {
        let totalServiceItemsValue = 0;
        let totalProfessionalExpenses = 0; // Total para a duração do contrato
        let totalToolExpenses = 0; // Total para a duração do contrato

        const activatedToolNames = new Set();

        Object.entries(selectedServices).forEach(([serviceId, details]) => {
            if (details.active) {
                const service = services.find(s => s.id === parseInt(serviceId));
                if (service) {
                    if (service.pricingType === 'quantity') {
                        totalServiceItemsValue += service.unitPrice * details.quantity;
                    } else if (service.pricingType === 'value') {
                        totalServiceItemsValue += details.customValue;
                    }
                    // Adiciona as ferramentas selecionadas para este serviço ao conjunto de ferramentas ativadas
                    details.selectedTools.forEach(toolName => activatedToolNames.add(toolName));
                }
            }
        });

        // Calcula as despesas totais de profissionais para a duração do contrato
        const professionalExpensesBreakdown = {};
        professionals.forEach(prof => {
            professionalExpensesBreakdown[prof.name] = (professionalExpensesBreakdown[prof.name] || 0) + prof.monthlyFee;
        });
        // Multiplica o fee mensal total de profissionais pela duração do contrato
        Object.values(professionalExpensesBreakdown).forEach(fee => {
            totalProfessionalExpenses += fee * contractMonths;
        });

        // Calcula as despesas totais de ferramentas para a duração do contrato
        const toolExpensesBreakdown = {};
        tools.forEach(tool => {
            // A ferramenta só é incluída se o nome dela estiver no conjunto de ferramentas ativadas pelos serviços
            if (activatedToolNames.has(tool.name)) {
                toolExpensesBreakdown[tool.name] = (toolExpensesBreakdown[tool.name] || 0) + tool.monthlyCost;
            }
        });
        // Multiplica o custo mensal total das ferramentas ativadas pela duração do contrato
        Object.values(toolExpensesBreakdown).forEach(cost => {
            totalToolExpenses += cost * contractMonths;
        });

        // Base da proposta antes de impostos e despesas operacionais
        const totalProposalBase = totalServiceItemsValue + totalProfessionalExpenses + totalToolExpenses;
        const irPercentage = 0.075; // 7,5% de IR
        const operationalExpensesPercentage = 0.10; // 10% de Despesas Operacionais

        const irAmount = totalProposalBase * irPercentage;
        const operationalExpensesAmount = totalProposalBase * operationalExpensesPercentage;

        // Valor final da proposta (total para a duração do contrato)
        const finalProposalValue = totalProposalBase + irAmount + operationalExpensesAmount;

        // Cálculo do valor mensal final
        // Garante que a divisão não ocorra por zero se contractMonths for 0 (embora o input restrinja a >= 1)
        const monthlyProposalValue = contractMonths > 0 ? finalProposalValue / contractMonths : 0;


        return {
            totalServiceItemsValue,
            totalProfessionalExpenses,
            totalToolExpenses,
            irAmount,
            operationalExpensesAmount,
            finalProposalValue,
            monthlyProposalValue, // Adicionado o valor mensal
            professionalExpensesBreakdown,
            toolExpensesBreakdown,
        };
    }, [selectedServices, services, professionals, tools, contractMonths]);


    // =======================================================================
    // Componentes de Login e Landing Page
    // =======================================================================

    // Componente da Página de Login
    const LoginPage = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = (e) => {
            e.preventDefault();
            handleLogin(username, password);
        };

        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Login Vox Interno</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">Usuário</label>
                            <input
                                type="text"
                                id="username"
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Seu usuário"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Senha</label>
                            <input
                                type="password"
                                id="password"
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Sua senha"
                                required
                            />
                        </div>
                        {loginError && (
                            <p className="text-red-600 text-sm text-center">{loginError}</p>
                        )}
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 active:scale-95 text-lg font-semibold"
                        >
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        );
    };

    // Componente da Landing Page Interna
    const InternalLandingPage = () => (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 font-sans flex flex-col items-center justify-center py-12">
            <div className="max-w-4xl mx-auto w-full bg-white p-8 rounded-xl shadow-2xl text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Bem-vindo, {currentUser}!</h1>
                <p className="text-xl text-gray-700 mb-8">Esta é a área interna da Vox. Aqui você pode gerenciar e criar propostas para seus projetos.</p>
                <button
                    onClick={() => setShowProposalApp(true)}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 active:scale-95 text-xl font-semibold"
                >
                    Criar Proposta
                </button>
                <button
                    onClick={handleLogout}
                    className="mt-6 ml-4 px-6 py-3 bg-gray-200 text-gray-700 rounded-full shadow-md hover:bg-gray-300 transition-all duration-200 transform hover:scale-105 active:scale-95 text-md font-semibold"
                >
                    Sair
                </button>
            </div>
        </div>
    );

    // =======================================================================
    // Renderização Principal do App
    // =======================================================================
    if (!isLoggedIn) {
        return <LoginPage />;
    }

    if (!showProposalApp) {
        return <InternalLandingPage />;
    }

    // Renderiza o aplicativo de proposta completo se logado e showProposalApp for true
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 font-sans flex items-center justify-center py-12">
            <div className="max-w-5xl mx-auto w-full">
                <div className="flex justify-center mb-10 space-x-3 sm:space-x-6 bg-white p-2 rounded-full shadow-xl">
                    <button
                        onClick={() => setCurrentView('parameters')}
                        className={`px-5 py-2 sm:px-8 sm:py-3 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                            currentView === 'parameters' ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-400' : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-800'
                        }`}
                    >
                        Parâmetros
                    </button>
                    <button
                        onClick={() => setCurrentView('orders')}
                        className={`px-5 py-2 sm:px-8 sm:py-3 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                            currentView === 'orders' ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-400' : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-800'
                        }`}
                    >
                        Pedidos
                    </button>
                    <button
                        onClick={() => setCurrentView('summary')}
                        className={`px-5 py-2 sm:px-8 sm:py-3 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                            currentView === 'summary' ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-400' : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-800'
                        }`}
                    >
                        Resumo ({clientName || 'Cliente'})
                    </button>
                    <button
                        onClick={() => setShowProposalApp(false)} // Botão para voltar para a landing page
                        className="px-5 py-2 sm:px-8 sm:py-3 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 bg-red-500 text-white hover:bg-red-600"
                    >
                        Voltar
                    </button>
                </div>

                {currentView === 'parameters' && (
                    <ParametersTab
                        clientName={clientName} setClientName={setClientName}
                        contractName={contractName} setContractName={setContractName}
                        contractMonths={contractMonths} setContractMonths={setContractMonths}
                        tools={tools} handleToolChange={handleToolChange} handleAddTool={handleAddTool} handleRemoveTool={handleRemoveTool}
                        professionals={professionals} handleProfessionalChange={handleProfessionalChange} handleAddProfessional={handleAddProfessional} handleRemoveProfessional={handleRemoveProfessional}
                    />
                )}
                {currentView === 'orders' && (
                    <OrdersTab
                        services={services}
                        selectedServices={selectedServices}
                        handleServiceUpdate={handleServiceUpdate}
                        availableTools={tools}
                    />
                )}
                {currentView === 'summary' && (
                    <SummaryTab
                        clientName={clientName}
                        contractName={contractName}
                        contractMonths={contractMonths}
                        summary={summary}
                        services={services}
                        selectedServices={selectedServices}
                        // O valor mensal já está no objeto summary, não precisa passar separadamente
                    />
                )}
            </div>
        </div>
    );
};

export default App;
