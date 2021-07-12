@extends('layouts.admin')

@section('content')

<!-- Main content -->
<section class="content">

    <!-- Default box -->
    <div class="card">
    <div class="card-body p-0">
        <table class="min-w-max w-full table-auto">
            <thead>
                <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th class="py-3 px-6 text-left">
                        Request
                    </th>
                    <th class="py-3 px-6 text-center">Action</th>
                </tr>
            </thead>
            <tbody class="text-gray-600 text-sm font-light">
                @if (count($requests) > 0)
                    @foreach ($requests as $request)
                    <tr class="brequest-b brequest-gray-200 hover:bg-gray-100">
                        <td class="py-3 px-6 text-left">
                           <p>{{ $request->user_id ? $request->user['fullname'] : $request->values['fullname'] }} has requested to {{ $request->action }} a {{ $request->table_name == "users" ? "trader account" : substr($request->table_name, 0, -1)}}.</p>
                        </td>
                        <td class="py-3 px-6 text-center">
                            <div class="flex item-center justify-center ">
                                @if (auth()->user()->role == "Admin")
                                    @if ($request->status == "0")
                                        <form method="POST" action="/admin/request/{{ $request->id }}/accept">
                                            @csrf
                                            <button type="submit" class="cursor-pointer w-4 mr-2 transform hover:text-green-500 hover:scale-110">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 32 32">
                                                    <path d="M12.32,26.5a3.32,3.32,0,0,1-2.36-1l-7-7a3.35,3.35,0,0,1,0-4.72,3.4,3.4,0,0,1,4.72,0l4.64,4.64,12-12a3.42,3.42,0,0,1,4.7,0,3.35,3.35,0,0,1,0,4.71h0L14.68,25.52A3.32,3.32,0,0,1,12.32,26.5Zm-7-11.66a1.32,1.32,0,0,0-.94.4,1.35,1.35,0,0,0,0,1.89l7,7a1.34,1.34,0,0,0,1.89,0L27.61,9.78a1.35,1.35,0,0,0,0-1.89,1.37,1.37,0,0,0-1.88,0L13,20.57a1,1,0,0,1-1.41,0L6.28,15.23A1.34,1.34,0,0,0,5.33,14.83Zm23-4.35h0Z"/>
                                                </svg>
                                            </button>
                                        </form>
                                        <form method="POST" action="/admin/request/{{ $request->id }}/reject">
                                            @csrf
                                            <button type="submit" class="cursor-pointer w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" enable-background="new 0 0 15 15" viewBox="0 0 15 15">
                                                    <path d="M7.5,0C3.364,0,0,3.364,0,7.5S3.364,15,7.5,15S15,11.636,15,7.5S11.636,0,7.5,0z M7.5,14C3.916,14,1,11.084,1,7.5  S3.916,1,7.5,1S14,3.916,14,7.5S11.084,14,7.5,14z"/><polygon points="10.146 4.146 7.5 6.793 4.854 4.146 4.146 4.854 6.793 7.5 4.146 10.146 4.854 10.854 7.5 8.207 10.146 10.854 10.854 10.146 8.207 7.5 10.854 4.854"/>
                                                </svg>
                                            </button>
                                        </form>
                                    @else
                                        <span class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none {{ $request["status"] == "1" ? "text-indigo-100 bg-green-700" : "text-green-100 bg-red-700"}} rounded">{{ $request["status"] == "1" ? "Accepted" : "Rejected"}}</span>
                                    @endif
                                @endif
                                {{-- <a href="/admin/requests/{{ $request['id'] }}/edit" class="w-4 mr-2 transform hover:text-purple-500 cursor-pointer hover:scale-110">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </a>
                                
                                <button class="w-4 mr-2 transform hover:text-red-500 cursor-pointer hover:scale-110 showDelBtn" type="submit">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button> --}}
                            </div>
                            {{-- <a class="btn btn-info btn-sm" href="/admin/requests/{{ $request['id'] }}/edit">
                                <i class="fas fa-pencil-alt">
                                </i>
                                Edit
                            </a>
                            <form style="display:inline" method="POST" action="{{ route('requests.destroy', $request->id) }}">
                                @method('DELETE')
                                @csrf
                                <button class="btn btn-danger btn-sm" type="submit">
                                    <i class="fas fa-trash">
                                    </i>
                                    Delete
                                </button>
                            </form> --}}
                        </td>
                    </tr>
                    @endforeach
                @else
                <tr class="brequest-b brequest-gray-200 hover:bg-gray-100"><td colspan="2" class="py-3 px-6 text-left">No requests found!</td></tr>
                @endif
            </tbody>
        </table>
        <div class="my-3 mx-3">
            {!! $requests->links() !!}
        </div>
    </div>
    <!-- /.card-body -->
    </div>
    <!-- /.card -->

</section>

<!-- /.content -->
@endsection


