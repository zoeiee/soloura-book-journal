import streamlit as st
import time
from datetime import datetime


st.set_page_config(
    page_title="Soloura Book Journal",
    page_icon="📚",
    layout="wide",
    initial_sidebar_state="collapsed"
)

st.markdown("""
    <style>
        /* CSS Keyframes from tailwind.config.js */
        @keyframes glowPulse {
            0%, 100% { opacity: 0.6; filter: drop-shadow(0 0 8px rgba(244, 179, 102, 0.3)); }
            50% { opacity: 0.8; filter: drop-shadow(0 0 16px rgba(244, 179, 102, 0.5)); }
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Base Next.js Global Styles & Variables */
        .stApp {
            background-color: #0d0b09; /* night-950 */
            color: #f4efe9; /* cream */
            font-family: 'system-ui', sans-serif;
        }

        h1, h2, h3, h4 {
            font-family: 'Georgia', 'serif' !important;
            color: #f4b366 !important; /* ember-500 */
        }

        /* Custom UI Components & Cards */
        .ambient-glow {
            position: absolute;
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(244,179,102,0.1) 0%, rgba(0,0,0,0) 70%);
            top: 10%;
            left: 25%;
            z-index: 0;
            pointer-events: none;
            animation: glowPulse 4s ease-in-out infinite;
        }

        .book-card {
            background: #1a1410; /* night-900 */
            border: 1px solid rgba(125, 107, 95, 0.2); /* night-600/20 */
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 20px;
            transition: all 0.3s ease;
            box-shadow: 0 0 30px rgba(244, 179, 102, 0.05);
            animation: fadeIn 0.5s ease-out;
        }

        .book-card:hover {
            border-color: #c59b27; /* ember-700 */
            box-shadow: 0 0 30px rgba(244, 179, 102, 0.2); /* candlelight */
        }

        .status-badge {
            background: rgba(197, 155, 39, 0.15); /* ember-700/15 */
            color: #fad8ad; /* ember-300 */
            padding: 4px 12px;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        blockquote {
            border-left: 4px solid #c59b27 !important; /* ember-700 */
            background: #41332b30 !important; /* night-800/30 */
            color: #d7cfc7 !important; /* night-200 */
            padding: 12px 20px !important;
            margin: 12px 0 !important;
            border-radius: 0 8px 8px 0;
            font-style: italic;
        }
        
        .stat-value {
            font-size: 2rem;
            font-weight: bold;
            color: #f7c584; /* ember-400 */
            font-family: 'Georgia', serif;
        }
    </style>
    <div class="ambient-glow"></div>
""", unsafe_allow_html=True)



if "books" not in st.session_state:
    st.session_state.books = [
        {
            "id": "1",
            "title": "The Secret History",
            "author": "Donna Tartt",
            "status": "completed",
            "cover": "https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=600&fit=crop",
            "notes": "A haunting tale of privilege and moral decay. The prose is intoxicating, and the characters linger long after you finish.",
            "quotes": [{"id": "q1", "text": '"The grotesque world is the only true world."', "page": 234}],
            "dateAdded": "2024-01-15",
            "rating": 5
        },
        {
            "id": "2",
            "title": "Ninth House",
            "author": "Leigh Bardugo",
            "status": "reading",
            "cover": "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop",
            "notes": "Dark academia meets supernatural mystery. The world-building is intricate and immersive.",
            "quotes": [],
            "dateAdded": "2024-02-03"
        },
        {
            "id": "3",
            "title": "Mexican Gothic",
            "author": "Silvia Moreno-Garcia",
            "status": "completed",
            "cover": "https://images.unsplash.com/photo-1543002588-d83cdf1d3644?w=400&h=600&fit=crop",
            "notes": "A Gothic masterpiece set in Mexico. The atmosphere is suffocating and beautiful, dripping with dread.",
            "quotes": [{"id": "q2", "text": '"Fear was the only thing that had ever made sense to me."', "page": None}],
            "dateAdded": "2024-01-01",
            "rating": 4
        },
        {
            "id": "4",
            "title": "The Starless Sea",
            "author": "Erin Morgenstern",
            "status": "want-to-read",
            "cover": "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=600&fit=crop",
            "notes": "",
            "quotes": [],
            "dateAdded": "2024-02-10"
        },
        {
            "id": "5",
            "title": "Piranesi",
            "author": "Susanna Clarke",
            "status": "completed",
            "cover": "https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=600&fit=crop",
            "notes": "A mysterious, intricate tale of memory and identity. The prose is lyrical and strange.",
            "quotes": [{"id": "q3", "text": '"The world is not as it appears to be."', "page": None}],
            "dateAdded": "2024-01-28",
            "rating": 5
        }
    ]

# Zustand Reducer API Mutation Clones
def add_book(title, author, status, notes, cover=None, rating=None):
    new_book = {
        "id": str(int(time.time() * 1000)),
        "title": title,
        "author": author,
        "status": status,
        "cover": cover if cover else "https://images.unsplash.com/photo-1543002588-d83cdf1d3644?w=400&h=600&fit=crop",
        "notes": notes,
        "quotes": [],
        "dateAdded": datetime.now().strftime("%Y-%m-%d"),
        "rating": rating
    }
    st.session_state.books.insert(0, new_book)

def update_book(book_id, updates):
    for book in st.session_state.books:
        if book["id"] == book_id:
            book.update(updates)
            break

def delete_book(book_id):
    st.session_state.books = [b for b in st.session_state.books if b["id"] != book_id]

def add_quote(book_id, text, page=None):
    for book in st.session_state.books:
        if book["id"] == book_id:
            book["quotes"].append({
                "id": f"q_{int(time.time() * 1000)}",
                "text": text,
                "page": page
            })
            break

def remove_quote(book_id, quote_id):
    for book in st.session_state.books:
        if book["id"] == book_id:
            book["quotes"] = [q for q in book["quotes"] if q["id"] != quote_id]
            break




# --- APPLICATION HEADER ---
st.title("Soloura Book Journal")
st.caption("✨ *A cozy space for thoughts and reflections harvested from pages turned.*")
st.markdown("<br>", unsafe_allow_html=True)

# --- TRACKING STATS ARCHITECTURE ---
total_cnt = len(st.session_state.books)
reading_cnt = len([b for b in st.session_state.books if b["status"] == "reading"])
completed_cnt = len([b for b in st.session_state.books if b["status"] == "completed"])

stat_col1, stat_col2, stat_col3 = st.columns(3)
with stat_col1:
    st.markdown(f'<div style="text-align:center; background:#1a1410; border:1px solid #41332b; padding:16px; border-radius:8px;"><p style="color:#af9f93; margin:0;">📚 Books Cataloged</p><p class="stat-value">{total_cnt}</p></div>', unsafe_allow_html=True)
with stat_col2:
    st.markdown(f'<div style="text-align:center; background:#1a1410; border:1px solid #41332b; padding:16px; border-radius:8px;"><p style="color:#af9f93; margin:0;">📖 Active Reads</p><p class="stat-value">{reading_cnt}</p></div>', unsafe_allow_html=True)
with stat_col3:
    st.markdown(f'<div style="text-align:center; background:#1a1410; border:1px solid #41332b; padding:16px; border-radius:8px;"><p style="color:#af9f93; margin:0;">✓ Completed Journeys</p><p class="stat-value">{completed_cnt}</p></div>', unsafe_allow_html=True)

st.markdown("<br>", unsafe_allow_html=True)


# --- INTERACTIVE MODAL COMPONENT (AddBookModal) ---
with st.expander("📝 Log a New Literary Read"):
    with st.form("new_book_form", clear_on_submit=True):
        col_form1, col_form2 = st.columns(2)
        with col_form1:
            title_input = st.text_input("Book Title", placeholder="e.g. The Starless Sea")
            author_input = st.text_input("Author Name", placeholder="e.g. Erin Morgenstern")
        with col_form2:
            status_input = st.selectbox("Reading Status", ["reading", "completed", "want-to-read"])
            rating_input = st.slider("Rating Score (Optional)", 1, 5, 5)
            
        notes_input = st.text_area("Personal Reflections & Journal Entries")
        cover_input = st.text_input("Custom Book Cover Image Link (Optional URL)")
        
        submit_btn = st.form_submit_button(
            label="Append to Bookshelf", 
            type="primary"
        )
        if submit_btn:
            if title_input and author_input:
                add_book(title_input, author_input, status_input, notes_input, cover_input, rating_input)
                st.success(f"Successfully pinned '{title_input}' to your journal system!")
                time.sleep(0.5)
                st.rerun()
            else:
                st.error("Validation Denied: Ensure Title and Author fields are populated.")


# --- DYNAMIC MATRIX RENDERING & VIEW SEGMENT FILTERING ---
st.markdown("<br><h3>My Digital Bookshelf</h3>", unsafe_allow_html=True)
filter_tab = st.radio("Filter Status Segment:", ["All Tracked", "Reading", "Completed", "Want to Read"], horizontal=True)

filter_map = {
    "All Tracked": "all",
    "Reading": "reading",
    "Completed": "completed",
    "Want to Read": "want-to-read"
}
selected_filter = filter_map[filter_tab]

# Iterate through core data engine
for book in st.session_state.books:
    if selected_filter != "all" and book["status"] != selected_filter:
        continue
        
    # Translate status tags visually
    status_emoji_map = {"reading": "📖 READING", "completed": "✓ COMPLETED", "want-to-read": "⭐ WANT TO READ"}
    display_status = status_emoji_map.get(book['status'], book['status'])
    
    stars = f" | {'⭐' * book['rating']}" if book.get('rating') else ""

    # Compile presentation view using exact CSS classes
    st.markdown(f"""
    <div class="book-card">
        <div style="display: flex; gap: 24px; align-items: start; flex-wrap: wrap;">
            <img src="{book['cover']}" style="width: 100px; height: 150px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.5);"/>
            <div style="flex: 1; min-width: 250px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span class="status-badge">{display_status}{stars}</span>
                    <span style="color: #7d6b5f; font-size: 0.8rem; font-family: monospace;">Added: {book['dateAdded']}</span>
                </div>
                <h3 style="margin: 12px 0 2px 0; font-size: 1.4rem;">{book['title']}</h3>
                <p style="color: #af9f93; margin: 0 0 12px 0; font-family: 'Georgia', serif;">by {book['author']}</p>
                <p style="font-size: 0.95rem; color: #f4efe9; line-height: 1.6;">{book['notes'] if book['notes'] else '<i>No reflections logged yet for this text.</i>'}</p>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)

    # Secondary Controller Grid Layer (Manage Quotes, Mutations, Deletion per book card)
    ctrl_col1, ctrl_col2, ctrl_col3 = st.columns([3, 2, 1])
    
    with ctrl_col1:
        # Display Quote blocks mapping array
        if book["quotes"]:
            for q in book["quotes"]:
                page_info = f" (Page {int(q['page'])})" if q.get('page') else ""
                st.markdown(f"<blockquote>“{q['text']}”{page_info}</blockquote>", unsafe_allow_html=True)
                
    with ctrl_col2:
        # Mini input box integration simulating the dynamic overlay update functionality
        with st.popover(f"✒️ Annotate Quote"):
            quote_text = st.text_input("Line Text", key=f"txt_{book['id']}")
            quote_page = st.number_input("Page # (Optional)", min_value=1, step=1, value=None, key=f"pg_{book['id']}")
            if st.button("Commit Annotation", key=f"btn_q_{book['id']}", type="secondary"):
                if quote_text:
                    add_quote(book["id"], quote_text, quote_page)
                    st.success("Quote cataloged!")
                    time.sleep(0.4)
                    st.rerun()
                    
    with ctrl_col3:
        # Target action for database removal
        if st.button("🗑️ Purge Entry", key=f"del_{book['id']}", help="Permanently eliminate this book and its reflections"):
            delete_book(book["id"])
            st.toast(f"Purged entry ID: {book['title']}")
            time.sleep(0.4)
            st.rerun()

st.markdown("<br><hr style='border-color:#41332b;'><p style='text-align:center; color:#5f4f45; font-size:0.8rem; font-family:monospace;'>Soloura System • Encoded elegantly via Streamlit Native Python</p>", unsafe_allow_html=True)