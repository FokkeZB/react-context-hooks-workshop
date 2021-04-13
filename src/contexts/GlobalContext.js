import { HotelsProvider } from './HotelsContext';
import { ReviewsProvider } from './ReviewsContext';

export const GlobalContext = ({ children }) => (
    <HotelsProvider>
        <ReviewsProvider>
            {children}
        </ReviewsProvider>
    </HotelsProvider>
);

export default GlobalContext;