import React from 'react';

const Logo = ({ collapsed }) => {
    return (
        <div className="flex flex-col items-center justify-center p-4 min-h-[64px] transition-all duration-200 ease-in-out w-full select-none">
            <div className="flex items-center justify-center gap-2 w-full">
                {/* The 'N' Box */}
                <b className="w-[32px] h-[32px] min-w-[32px] min-h-[32px] bg-[#d4f35b] text-[#182630] rounded-[9px_3px_9px_3px] flex items-center justify-center text-lg font-bold shadow-sm">
                    N
                </b>

                {/* Smoothly hide text when collapsed */}
                {!collapsed && (
                    <strong className="text-lg font-bold text-white whitespace-nowrap animate-fade-in">
                        NitiSetu
                    </strong>
                )}
            </div>

            {/* Subtitle hidden when collapsed */}
            {!collapsed && (
                <small className="text-[8px] opacity-70 text-white tracking-widest mt-1 whitespace-nowrap">
                    AI LEARNING INTELLIGENCE
                </small>
            )}
        </div>
    );
};

export default Logo;
