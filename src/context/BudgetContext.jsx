const BudgetContext = createContext();

export const useBudgets = () => useContext(BudgetContext);

export const BudgetProvider = ({ children }) => {
    const [budgets, setBudgets] = useState([]);

    const addBudget = (newBudget) => {
        setBudgets(prev => [...prev, newBudget]);
    };

    const updateBudget = (categoryId, newBudget) => {
        setBudgets(prev => prev.map(budget => budget.categoryId === categoryId ? {...budget, ...newBudget} : budget));
    };

    return (
        <BudgetContext.Provider value={{ budgets, addBudget, updateBudget }}>
            {children}
        </BudgetContext.Provider>
    );
};
