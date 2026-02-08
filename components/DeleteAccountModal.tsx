import React from 'react';
import { AlertTriangle, Download, Trash2, X } from 'lucide-react';
import { User } from '../types';

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    userData: Partial<User>;
}

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ isOpen, onClose, onConfirm, userData }) => {
    if (!isOpen) return null;

    const handleExportData = () => {
        const dataStr = JSON.stringify(userData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = `user_data_${userData.username || 'export'}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden transform transition-all scale-100">

                {/* Header */}
                <div className="bg-red-50 px-6 py-4 border-b border-red-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-full">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                        <h3 className="text-lg font-bold text-red-900">Delete Account</h3>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    <p className="text-gray-700 font-medium">
                        Aviso de Irreversibilidade
                    </p>
                    <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        "Os seus dados serão mantidos por 30 dias para recuperação e, após esse prazo, serão apagados permanentemente, exceto faturas e dados fiscais".
                    </p>

                    <div className="pt-2">
                        <p className="text-sm text-gray-600 mb-2">
                            Você pode exportar seus dados antes de confirmar a exclusão:
                        </p>
                        <button
                            onClick={handleExportData}
                            className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors text-sm font-medium"
                        >
                            <Download className="h-4 w-4" />
                            Exportar Dados (JSON)
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center gap-2"
                    >
                        <Trash2 className="h-4 w-4" />
                        Confirmar Exclusão
                    </button>
                </div>
            </div>
        </div>
    );
};
